//creating model and migrations

// npx sequelize-cli model:generate --name User --attributes email:string,firstName:string,lastName:string,isVerified:boolean,userType:string,country:string,cityOrState:string,description:string,profileImage:string,password:string
// npx sequelize-cli model:generate --name Channel --attributes name:string,profileImage:string,bannerImage:string,description:string
// npx sequelize-cli model:generate --name Media --attributes title:string,description:string,file:string,category:string,ageRestriction:boolean,accessType:string,mediaType:string,mediaTokenLimit:integer,dateCreated:date,views:integer
// npx sequelize-cli model:generate --name Comment --attributes text:string,likes:integer,dislikes:integer
// npx sequelize-cli model:generate --name Comment_Reply --attributes text:string,likes:integer,dislikes:integer
// npx sequelize-cli model:generate --name Notification --attributes text:string,isRead:boolean
// npx sequelize-cli model:generate --name Detail --attributes likes:integer,dislikes:integer,tip:integer
// npx sequelize-cli model:generate --name Subscription --attributes subscriptionDate:date
// npx sequelize-cli model:generate --name Thumbnail --attributes image:string
// npx sequelize-cli model:generate --name Tag --attributes tag:string
// npx sequelize-cli model:generate --name Media_Price --attributes fortyEightHoursAccess:integer,lifeTimeAccess:integer
// npx sequelize-cli model:generate --name Payment_Type --attributes name:string
// npx sequelize-cli model:generate --name Smart_Contract --attributes contractAddress:string,contractABI:string,functionName:string
// npx sequelize-cli model:generate --name Metamask --attributes walletAddress:string,TVibeSubscriptionPrice:integer,TFuelSubscriptionPrice:integer
// npx sequelize-cli model:generate --name Fait --attributes clientId:string,clientSecret:string,subscriptionPrice:string
// npx sequelize-cli model:generate --name UserType --attributes user:boolean,creator:boolean

// creating seeds
// npx sequelize-cli seed:generate --name user
// npx sequelize-cli seed:generate --name channel
// npx sequelize-cli seed:generate --name media
// npx sequelize-cli seed:generate --name Comment
// npx sequelize-cli seed:generate --name Comment_Reply
// npx sequelize-cli seed:generate --name Notification
// npx sequelize-cli seed:generate --name Detail
// npx sequelize-cli seed:generate --name Subscription
// npx sequelize-cli seed:generate --name Thumbnail
// npx sequelize-cli seed:generate --name Tag
// npx sequelize-cli seed:generate --name Media_Price
// npx sequelize-cli seed:generate --name Payment_Type
// npx sequelize-cli seed:generate --name Smart_Contract
// npx sequelize-cli seed:generate --name Metamask
// npx sequelize-cli seed:generate --name Fait
// npx sequelize-cli seed:generate --name UserType
