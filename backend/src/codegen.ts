import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    schema: 'src/graphql/typeDefs/**/*.ts',
    generates: {
        'src/graphql/generated/graphql.ts': {
            plugins: ['typescript', 'typescript-resolvers'],
            config: {
                contextType: '../context#AppContext'
            }
        }
    }
};

export default config;
