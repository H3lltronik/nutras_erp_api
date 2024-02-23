import { BaseFilterHandler } from '@/src/common/filters/BaseFilterHandler';
import { Provider } from '../entities/provider.entity';
import { ProviderDraftModeFilter } from './methods/provider-draft-mode.filter';
import { ProviderPublishedModeFilter } from './methods/provider-published-mode.filter';
import { ProviderNameSearchFilter } from './methods/provider-name-search.filter';
import { ProviderCodeSearchFilter } from './methods/provider-code-search.filter';
import { ProviderRFCSearchFilter } from './methods/provider-rfc-search.filter';
import { ProviderDeletedFilter } from './methods/provider-deleted.filter';

export class ProvidersFiltersHandler extends BaseFilterHandler<Provider> {
  protected filters = {
    draftMode: new ProviderDraftModeFilter(),
    published: new ProviderPublishedModeFilter(),
    deleted: new ProviderDeletedFilter(),
    nameSearch: new ProviderNameSearchFilter(),
    codeSearch: new ProviderCodeSearchFilter(),
    rfcSearch: new ProviderRFCSearchFilter(),
  };
}
