import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseDto } from 'src/common/dto/responseDto';
import { Recipe } from './entities/recipe.entity';
import { SUCCESS_GET_DATA } from '../../constants';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';

@ApiBearerAuth()
@Controller('recipe')
@ApiTags('Recipes')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Get()
  @ApiQuery({ name: 'take', type: 'number', required: false })
  @ApiQuery({ name: 'skip', type: 'number', required: false })
  async getAllRecipe(@Query() { take, skip }): Promise<ResponseDto<Recipe[]>> {
    const recipeList = await this.recipeService.findAll(take, skip);

    return new ResponseDto(recipeList, 200, SUCCESS_GET_DATA);
  }

  @Get('get-recipe/:id')
  async getRecipeById(@Param('id') id: string): Promise<ResponseDto<Recipe>> {
    const recipe = await this.recipeService.findOne(+id);
    return new ResponseDto(recipe, 200, SUCCESS_GET_DATA);
  }

  @Get('search-recipe')
  @ApiQuery({ name: 'name', type: 'string', required: true })
  @ApiOkResponse({ description: SUCCESS_GET_DATA })
  async searchRecipe(
    @Query() { name },
  ): Promise<ResponseDto<{ recipeName: string }[]>> {
    const recipe = await this.recipeService.searchRecipe(name);
    return new ResponseDto(recipe, 200, SUCCESS_GET_DATA);
  }

  @Post('create-recipe')
  createRecipe(@Body() body: CreateRecipeDto, @Request() req) {
    return this.recipeService.createRecipe(body, req.userId);
  }

  @Put('update-recipe/:recipeId')
  updateRecipe(
    @Body() body: UpdateRecipeDto,
    @Param('recipeId') recipeId: number,
  ) {
    return this.recipeService.updateRecipe(body, recipeId);
  }
}
