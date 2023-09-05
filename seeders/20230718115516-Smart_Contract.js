module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Smart_Contracts", [
      {
        CHANNEL_id: 1,
        contractAddress: "abcjhdkfhdskfj",
        contractABI: "dshdsfsdjfhsd",
        functionName: "Call Me Function",
      },
      {
        CHANNEL_id: 1,
        contractAddress: "abcjhdkfhdskfj",
        contractABI: "dshdsfsdjfhsd",
        functionName: "Call Me Function",
      },
      {
        CHANNEL_id: 1,
        contractAddress: "abcjhdkfhdskfj",
        contractABI: "dshdsfsdjfhsd",
        functionName: "Call Me Function",
      },
      {
        CHANNEL_id: 1,
        contractAddress: "abcjhdkfhdskfj",
        contractABI: "dshdsfsdjfhsd",
        functionName: "Call Me Function",
      },
      {
        CHANNEL_id: 1,
        contractAddress: "abcjhdkfhdskfj",
        contractABI: "dshdsfsdjfhsd",
        functionName: "Call Me Function",
      },
      {
        CHANNEL_id: 2,
        contractAddress: "abcjhdkfhdskfj",
        contractABI: "dshdsfsdjfhsd",
        functionName: "Call Me Function",
      },
      {
        CHANNEL_id: 2,
        contractAddress: "abcjhdkfhdskfj",
        contractABI: "dshdsfsdjfhsd",
        functionName: "Call Me Function",
      },
      {
        CHANNEL_id: 2,
        contractAddress: "abcjhdkfhdskfj",
        contractABI: "dshdsfsdjfhsd",
        functionName: "Call Me Function",
      },
      {
        CHANNEL_id: 3,
        contractAddress: "abcjhdkfhdskfj",
        contractABI: "dshdsfsdjfhsd",
        functionName: "Call Me Function",
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Smart_Contracts", null, {});
  },
};
