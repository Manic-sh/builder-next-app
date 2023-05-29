// const adminSDK = createAdminApiClient("Private Key from the source space");

// // example getting all models fields on a space:
// async function getAllModels(){
// return await adminSDK.query({
// models: {
// id: true,
// fields: true,
// },
// });
// }


// function getModelId(){
// return "Model ID"; // Source Model Id to copy
// }
// getAllModels().then(res => {
// const allModels = res.data?.models;
// const modelId = getModelId();


// let model = allModels?.filter((model) => {
// return model.id === modelId;
// });

// // // example creating a model from admin api
// // async function createModelCopy(fields:object) {
// // const destAdminSDK = createAdminApiClient("Private key of the Destination Space")
// // await destAdminSDK.chain.mutation
// // .addModel({
// // body: {
// // defaultQuery: [],
// // kind: 'component',
// // showTargeting: true,
// // allowHeatmap: true,
// // id: 'xxxxxx',
// // showMetrics: true,
// // publicReadable: true,
// // name: 'newAuthor',
// // useQueryParamTargetingClientSide: false,
// // fields: fields,
// // helperText: 'This model is for announcement bars',
// // allowBuiltInComponents: true,
// // bigData: false,
// // strictPrivateWrite: false,
// // requiredTargets: [],
// // schema: {},
// // examplePageUrl: 'http://localhost:3000/preview',
// // webhooks: [],
// // apiGenerated: true,
// // showScheduling: true,
// // showAbTests: true,
// // pathPrefix: '/author',
// // componentsOnlyMode: false,
// // },
// // })
// // .execute({});
// // }
// // createModelCopy(model[0].fields);
// // });