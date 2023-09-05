"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Channel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        as: "userChannel",
        foreignKey: {
          name: "userId",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      this.hasMany(models.Subscription, {
        as: "subscribers",
        foreignKey: {
          name: "channelId",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      this.hasMany(models.Comment, {
        //as: "channelMedia",
        foreignKey: {
          name: "mediaChannelId",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      //
      this.hasMany(models.Thumbnail, {
        //as: "channelMedia",
        foreignKey: {
          name: "mediaChannelId",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      this.hasMany(models.Tag, {
        //as: "channelMedia",
        foreignKey: {
          name: "mediaChannelId",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      this.hasMany(models.Media_Price, {
        //as: "channelMedia",
        foreignKey: {
          name: "mediaChannelId",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      this.hasMany(models.Payment_Type, {
        //as: "channelMedia",
        foreignKey: {
          name: "mediaChannelId",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      this.hasMany(models.Media, {
        //as: "channelMedia",
        foreignKey: {
          name: "channelId",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      //

      //

      this.hasOne(models.Fait, {
        //as: "userChannel",
        foreignKey: {
          name: "channelId",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      //
    }
  }
  Channel.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: false,
      },
      profileImage: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      bannerImage: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      usdPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      tfuelPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      tvibePrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      totalEarned: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      underTaking: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      apiKey: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: false,
      },
      apiSecret: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Channel",
    }
  );
  return Channel;
};
