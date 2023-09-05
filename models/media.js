"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Media extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Comment, {
        //as: "channelMedia",
        foreignKey: {
          name: "mediaId",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      this.belongsTo(models.Category, {
        as: "categoryMedia",
        foreignKey: {
          name: "categoryId",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      this.belongsTo(models.Channel, {
        // as: "channelMedia",
        foreignKey: {
          name: "channelId",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      //
      this.hasMany(models.Thumbnail, {
        // as: "userChannel",
        foreignKey: {
          name: "mediaId",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      this.hasMany(models.Tag, {
        // as: "userChannel",
        foreignKey: {
          name: "mediaId",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      this.hasMany(models.Media_Price, {
        // as: "userChannel",
        foreignKey: {
          name: "mediaId",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      this.hasMany(models.Payment_Type, {
        // as: "userChannel",
        foreignKey: {
          name: "mediaId",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      //

      this.hasMany(models.Detail, {
        // as: "userChannel",
        foreignKey: {
          name: "mediaId",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Media.init(
    {
      channelId: {
        type: DataTypes.INTEGER,
        references: {
          model: "channels",
          key: "id",
        },
      },
      categoryId: {
        type: DataTypes.INTEGER,
        references: {
          model: "categories",
          key: "id",
        },
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: false,
      },
      file: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: false,
      },

      ageRestriction: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      accessType: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: false,
      },
      mediaType: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: false,
      },
      mediaTokenLimit: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: false,
      },
      views: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: false,
      },
      videoPreview: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Media",
    }
  );
  return Media;
};
