//creating model and migrations

// npx sequelize-cli model:generate --name User --attributes email:string,firstName:string,lastName:string,emailVerified:boolean,userType:string,country:string,cityOrState:string,description:string,profileImage:string,password:string
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

//test....//
// const user = require("./user");
// const channel = require("./channel");
// const media = require("./media");
// const comment = require("./comment");
// const comment_reply = require("./comment_reply");
// const notification = require("./notification");
// const detail = require("./detail");
// const subscription = require("./subscription");
// const thumbnail = require("./thumbnail");
// const tag = require("./tag");
// const media_price = require("./media_price");
// const payment_type = require("./payment_type");
// const smart_contract = require("./smart_contract");
// const metamask = require("./metamask");
// const fait = require("./fait");

// //user and channel relation
// user.hasMany(channel);
// channel.belongTo(user);

// //user and notification relation
// user.hasMany(notification);
// notification.belongTo(user);

// //user,media, channel and comment Relation
// user.hasMany(comment);
// comment.belongTo(user);
// media.hasMany(comment);
// comment.belongTo(media);
// channel.hasMany(comment);
// comment.belongTo(channel);

// //user,comment and comment Reply Relation
// user.hasMany(comment_reply);
// comment_reply.belongTo(user);
// comment.hasMany(comment_reply);
// comment_reply.belongTo(comment);

// //media and thumbnail relation
// media.hasMany(thumbnail);
// thumbnail.belongTo(media);

// //media and tags relation
// media.hasMany(tag);
// tag.belongTo(media);

// //media and media price relation
// media.hasMany(media_price);
// media_price.belongTo(media);

// //media and payment type relation
// media.hasMany(payment_type);
// payment_type.belongTo(media);

// //channel and smart contract relation
// channel.hasOne(smart_contract);
// smart_contract.belongTo(channel);

// //channel and metamask relation
// channel.hasOne(metamask);
// metamask.belongTo(channel);

// //channel and fait relation
// channel.hasOne(fait);
// fait.belongTo(channel);

//test....test
