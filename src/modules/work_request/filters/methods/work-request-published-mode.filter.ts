import { SelectQueryBuilder } from 'typeorm';
import { Filter } from '../../../types';
import { WorkRequest } from '../../entities/work-request.entity';

export class WorkRequestPublishedModeFilter implements Filter<WorkRequest> {
  apply(
    query: SelectQueryBuilder<WorkRequest>,
    value: string,
  ): SelectQueryBuilder<WorkRequest> {
    return query.andWhere('workRequest.isPublished = :isDraft', {
      isDraft: value,
    });
  }
}
