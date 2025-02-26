import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import article, {
  ArticleState
} from 'app/entities/article/article.reducer';
// prettier-ignore
import category, {
  CategoryState
} from 'app/entities/category/category.reducer';
import factChecking, { FactCheckingState } from 'app/modules/fact-checking/fact-checking.reducer';
// prettier-ignore
import resource, {
  ResourceState
} from 'app/entities/resource/resource.reducer';
// prettier-ignore
import statement, {
  StatementState
} from 'app/entities/statement/statement.reducer';
// prettier-ignore
import statementSource, {
  StatementSourceState
} from 'app/entities/statement-source/statement-source.reducer';
// prettier-ignore
import topic, {
  TopicState
} from 'app/entities/topic/topic.reducer';
// prettier-ignore
import news, {
  NewsState
} from 'app/entities/news/news.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */
import featureStatement, { FeatureStatementState } from 'app/entities/feature-statement/feature-statement.reducer';
import kombuMessage, { KombuMessageState } from 'app/entities/kombu-message/kombu-message.reducer';
import openGraph, { OpenGraphState } from './open-graph';
import summarization, { SummarizationState } from 'app/modules/summarization/summarization.reducer';

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly article: ArticleState;
  readonly category: CategoryState;
  readonly factChecking: FactCheckingState;
  readonly openGraph: OpenGraphState;
  readonly resource: ResourceState;
  readonly statement: StatementState;
  readonly statementSource: StatementSourceState;
  readonly topic: TopicState;
  readonly featureStatement: FeatureStatementState;
  readonly kombuMessage: KombuMessageState;
  readonly news: NewsState;
  readonly summarization: SummarizationState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  article,
  category,
  factChecking,
  openGraph,
  resource,
  statement,
  statementSource,
  topic,
  featureStatement,
  kombuMessage,
  news,
  summarization,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar,
});

export default rootReducer;
