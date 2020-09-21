import * as config from 'config';

const graphQLConfig = config.get('graphQL');
export const graphQLConfigType = {
    autoSchemaFile: graphQLConfig.autoSchemaFile,
}