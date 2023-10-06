import { BaseFilterHandler } from '@/src/common/filters/BaseFilterHandler';
import { Provider } from '../entities/provider.entity';
import { ProviderDraftModeFilter } from './methods/provider-draft-mode.filter';
import { ProviderPublishedModeFilter } from './methods/provider-published-mode.filter';

export class ProvidersFiltersHandler extends BaseFilterHandler<Provider> {
  protected filters = {
    draftMode: new ProviderDraftModeFilter(),
    published: new ProviderPublishedModeFilter(),
  };
}
