import { Injectable, NotFoundException } from '@nestjs/common';
import { Recipe } from './entities/recipe.entity';
import { DataSource, ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { Step } from './entities/step.entity';
import { DetailIngredient } from './entities/detailIngredient.entity';
import { ResponseDto } from 'src/common/dto/responseDto';
import { SUCCESS_CREATE } from 'src/constants';
import { UpdateRecipeDto } from './dto/update-recipe.dto';

@Injectable()
export class RecipeService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Step)
    private readonly stepService: Repository<Step>,
    @InjectRepository(DetailIngredient)
    private readonly detailIngredientService: Repository<DetailIngredient>,
    @InjectRepository(Recipe)
    private readonly recipeService: Repository<Recipe>,
  ) {}

  async findAll(take: number = 10, skip: number = 0): Promise<Recipe[]> {
    const [recipeList] = await this.recipeService.findAndCount({
      order: {
        date: 'DESC',
      },
      take,
      skip,
      relations: {
        User: true,
      },
    });
    if (!recipeList) {
      throw new NotFoundException();
    }
    return recipeList;
  }

  async findOne(recipeId: number): Promise<Recipe> {
    const recipe = await this.recipeService.findOne({
      where: { recipeId },
      relations: {
        User: true,
        Step: true,
        DetailIngredient: true,
      },
    });
    if (!recipe) {
      throw new NotFoundException();
    }

    return recipe;
  }

  async searchRecipe(recipeName: string): Promise<{ recipeName: string }[]> {
    const recipe = await this.recipeService.find({
      where: { recipeName: ILike(`%${recipeName}%`), status: 'CK' },
      select: {
        recipeName: true,
      },
    });
    if (!recipe || (Array.isArray(recipe) && recipe.length === 0)) {
      throw new NotFoundException();
    }
    return recipe;
  }

  async createRecipe(body: CreateRecipeDto, userId: number) {
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      const { Steps, DetailIngredients, ...recipeBody } = body;
      const validate = {
        ...recipeBody,
        date: new Date(),
        userId,
      };
      const recipe = await queryRunner.manager.save(Recipe, {
        ...validate,
      });
      Steps.map((step) => {
        step.recipeId = recipe.recipeId;
        return step;
      });
      DetailIngredients.map((ingredient) => {
        ingredient.recipeId = recipe.recipeId;
        return ingredient;
      });
      await queryRunner.manager.insert(DetailIngredient, DetailIngredients);
      await queryRunner.manager.insert(Step, Steps);
      await queryRunner.commitTransaction();
      return new ResponseDto(null, 201, SUCCESS_CREATE);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      return new ResponseDto(null, 400, error.message);
    } finally {
      await queryRunner.release();
    }
  }

  async updateRecipe(body: UpdateRecipeDto, recipeId: number) {
    const recipeById = await this.findOne(recipeId);

    if (!recipeById) {
      throw new NotFoundException();
    }
    const dtIngredient = await this.getIngredientByRecipeId(recipeId);
    const steps = await this.getStepByRecipeId(recipeId);
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      const { Steps, DetailIngredients, ...recipe } = body;
      console.log(dtIngredient, steps, Steps, DetailIngredients);
      await queryRunner.manager.update(Recipe, recipeId, recipe);
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  getIngredientByRecipeId(recipeId: number) {
    return this.detailIngredientService.findBy({ recipeId: recipeId });
  }

  getStepByRecipeId(recipeId: number) {
    return this.stepService.findBy({ recipeId: recipeId });
  }
}
