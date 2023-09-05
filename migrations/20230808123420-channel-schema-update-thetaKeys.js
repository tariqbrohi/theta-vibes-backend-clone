module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.addColumn(
        "Channels",
        "apiKey",
        {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
          defaultValue: false,
        },
        { transaction: t }
      );

      await queryInterface.addColumn(
        "Channels",
        "apiSecret",
        {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
          defaultValue: false,
        },
        { transaction: t }
      );
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.removeColumn("Channels", "apiKey", {
        transaction: t,
      });
      await queryInterface.removeColumn("Channels", "apiSecret", {
        transaction: t,
      });
    });
  },
};
