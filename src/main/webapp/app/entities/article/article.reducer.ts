import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction, getSortState } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IArticle, defaultValue } from 'app/shared/model/article.model';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

const getFrontPageArticlesOrdered = arrayOfObjects => {
  const desiredOrder = ['climate_change', 'pandemic', 'immigration', 'crime'];

  return arrayOfObjects.sort((a, b) => {
    const indexA = desiredOrder.indexOf(a.categoryName);
    const indexB = desiredOrder.indexOf(b.categoryName);

    // If a.categoryName or b.categoryName is not in desiredOrder, they will be placed at the end of the array.
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;

    return indexA - indexB;
  });
};

export const ACTION_TYPES = {
  SEARCH_ARTICLES: 'article/SEARCH_ARTICLES',
  SEARCH_FRONT_ARTICLES: 'article/SEARCH_FRONT_ARTICLES',
  SEARCH_ARTICLES_IN_CATEGORY: 'article/SEARCH_ARTICLES_IN_CATEGORY',
  FETCH_ARTICLE_LIST: 'article/FETCH_ARTICLE_LIST',
  FETCH_PUBLISHED_ARTICLE_LIST: 'article/FETCH_PUBLISHED_ARTICLE_LIST',
  FETCH_CAROUSEL_ARTICLE_LIST: 'article/FETCH_CAROUSEL_ARTICLE_LIST',
  FETCH_ARTICLE_LIST_BY_PUBLISHED_AND_CATEGORY_NAME: 'article/FETCH_ARTICLE_LIST_BY_PUBLISHED_AND_CATEGORY_NAME',
  FETCH_SUGGESTIONS: 'article/FETCH_SUGGESTIONS',
  FETCH_ARTICLE: 'article/FETCH_ARTICLE',
  FETCH_FRONT_PAGE_ARTICLES: 'article/FETCH_FRONT_PAGE_ARTICLES',
  CREATE_ARTICLE: 'article/CREATE_ARTICLE',
  UPDATE_ARTICLE: 'article/UPDATE_ARTICLE',
  DELETE_ARTICLE: 'article/DELETE_ARTICLE',
  SET_BLOB: 'article/SET_BLOB',
  RESET: 'article/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IArticle>,
  carouselItems: [] as ReadonlyArray<IArticle>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
  suggestions: [] as ReadonlyArray<IArticle>,
  frontPageArticles: [],
};

export type ArticleState = Readonly<typeof initialState>;

// Reducer

export default (state: ArticleState = initialState, action): ArticleState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_ARTICLES):
    case REQUEST(ACTION_TYPES.SEARCH_ARTICLES_IN_CATEGORY):
    case REQUEST(ACTION_TYPES.FETCH_ARTICLE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PUBLISHED_ARTICLE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CAROUSEL_ARTICLE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ARTICLE_LIST_BY_PUBLISHED_AND_CATEGORY_NAME):
    case REQUEST(ACTION_TYPES.FETCH_ARTICLE):
    case REQUEST(ACTION_TYPES.FETCH_FRONT_PAGE_ARTICLES):
    case REQUEST(ACTION_TYPES.SEARCH_FRONT_ARTICLES):
    case REQUEST(ACTION_TYPES.FETCH_SUGGESTIONS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_ARTICLE):
    case REQUEST(ACTION_TYPES.UPDATE_ARTICLE):
    case REQUEST(ACTION_TYPES.DELETE_ARTICLE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.SEARCH_ARTICLES):
    case FAILURE(ACTION_TYPES.SEARCH_ARTICLES_IN_CATEGORY):
    case FAILURE(ACTION_TYPES.FETCH_ARTICLE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PUBLISHED_ARTICLE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CAROUSEL_ARTICLE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ARTICLE_LIST_BY_PUBLISHED_AND_CATEGORY_NAME):
    case FAILURE(ACTION_TYPES.FETCH_ARTICLE):
    case FAILURE(ACTION_TYPES.FETCH_FRONT_PAGE_ARTICLES):
    case FAILURE(ACTION_TYPES.SEARCH_FRONT_ARTICLES):
    case FAILURE(ACTION_TYPES.CREATE_ARTICLE):
    case FAILURE(ACTION_TYPES.UPDATE_ARTICLE):
    case FAILURE(ACTION_TYPES.DELETE_ARTICLE):
    case FAILURE(ACTION_TYPES.FETCH_SUGGESTIONS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.SEARCH_ARTICLES):
    case SUCCESS(ACTION_TYPES.SEARCH_ARTICLES_IN_CATEGORY):
    case SUCCESS(ACTION_TYPES.FETCH_ARTICLE_LIST):
    case SUCCESS(ACTION_TYPES.FETCH_PUBLISHED_ARTICLE_LIST):
    case SUCCESS(ACTION_TYPES.FETCH_ARTICLE_LIST_BY_PUBLISHED_AND_CATEGORY_NAME):
      return {
        ...state,
        loading: false,
        entities: [...state.entities, ...action.payload.data],
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_CAROUSEL_ARTICLE_LIST):
      return {
        ...state,
        loading: false,
        carouselItems: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_ARTICLE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_FRONT_PAGE_ARTICLES):
    case SUCCESS(ACTION_TYPES.SEARCH_FRONT_ARTICLES):
      return {
        ...state,
        loading: false,
        frontPageArticles: getFrontPageArticlesOrdered(action.payload.data),
      };
    case SUCCESS(ACTION_TYPES.CREATE_ARTICLE):
    case SUCCESS(ACTION_TYPES.UPDATE_ARTICLE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_ARTICLE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case SUCCESS(ACTION_TYPES.FETCH_SUGGESTIONS):
      return {
        ...state,
        loading: false,
        suggestions: action.payload.data,
      };
    case ACTION_TYPES.SET_BLOB: {
      const { name, data, contentType } = action.payload;
      return {
        ...state,
        entity: {
          ...state.entity,
          [name]: data,
          [name + 'ContentType']: contentType,
        },
      };
    }
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/articles';
const apiSearchUrl = 'api/_search/articles';

// Actions

export const getSearchSuggestions = query => ({
  type: ACTION_TYPES.FETCH_SUGGESTIONS,
  payload: axios.get<string>(`${apiSearchUrl}/suggestions?query=${query}`),
});

export const getSearchEntities = (query, page, size, sort, bool) => ({
  type: ACTION_TYPES.SEARCH_ARTICLES,
  payload: axios.get<IArticle>(`${apiSearchUrl}/${bool}?query=${query}${sort ? `&page=${page}&size=${size}&sort=${sort}` : ''}`),
});

export const getFrontSearchEntities = (query, page, size, sort, bool) => ({
  type: ACTION_TYPES.SEARCH_FRONT_ARTICLES,
  payload: axios.get<IArticle>(`${apiSearchUrl}/front/${bool}?query=${query}${sort ? `&page=${page}&size=${size}&sort=${sort}` : ''}`),
});

export const getSearchEntitiesInCategory = (query, published, category, page?: number, size?: number, sort?: string) => {
  const requestUrl = `${apiSearchUrl}/${category}/${published}`;
  return {
    type: ACTION_TYPES.SEARCH_ARTICLES,
    payload: axios.get<IArticle>(`${requestUrl}?query=${query}${sort ? `&page=${page}&size=${size}&sort=${sort}` : ''}`),
  };
};

export const getEntities: ICrudGetAllAction<IArticle> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_ARTICLE_LIST,
    payload: axios.get<IArticle>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getArticlesByPublishedAndCategoryName = (published, category, page?: number, size?: number, sort?: string) => {
  const requestUrl = `${apiUrl}/published/${published}/category_name/${category}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_ARTICLE_LIST_BY_PUBLISHED_AND_CATEGORY_NAME,
    payload: axios.get<IArticle>(`${requestUrl}${sort ? '&' : '?'}?cacheBuster=${new Date().getTime()}`),
  };
};

export const getAllPublishedArticles: ICrudGetAllAction<IArticle> = (page, size, sort) => {
  const requestUrl = `${apiUrl}/published${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_PUBLISHED_ARTICLE_LIST,
    payload: axios.get<IArticle>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getCarouselArticles = (number: number) => {
  const requestUrl = `${apiUrl}/carousel/${number}`;
  return {
    type: ACTION_TYPES.FETCH_CAROUSEL_ARTICLE_LIST,
    payload: axios.get<IArticle>(requestUrl),
  };
};

export const getEntity: ICrudGetAction<IArticle> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ARTICLE,
    payload: axios.get<IArticle>(requestUrl),
  };
};

export const getFrontPageArticles = () => {
  const requestUrl = `${apiUrl}/frontPage`;
  return {
    type: ACTION_TYPES.FETCH_FRONT_PAGE_ARTICLES,
    payload: axios.get<IArticle>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IArticle> = entity => ({
  type: ACTION_TYPES.CREATE_ARTICLE,
  payload: axios.post(apiUrl, cleanEntity(entity)),
});

export const updateEntity: ICrudPutAction<IArticle> = entity => ({
  type: ACTION_TYPES.UPDATE_ARTICLE,
  payload: axios.put(apiUrl, cleanEntity(entity)),
});

export const deleteEntity: ICrudDeleteAction<IArticle> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.DELETE_ARTICLE,
    payload: axios.delete(requestUrl),
  };
};

export const setBlob = (name, data, contentType?) => ({
  type: ACTION_TYPES.SET_BLOB,
  payload: {
    name,
    data,
    contentType,
  },
});

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
