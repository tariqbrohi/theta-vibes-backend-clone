// updateUser: async (req, res) => {
//   // const { email } = req.body;
//   const { email } = req.user;

//   const userDetails = req.body;

//   let user = await userRepository.getUserByEmail(email);

//   delete user.dataValues.password;
//   delete user.dataValues.email;

//   if (!user) {
//     res.status(STATUS.NOT_FOUND).json({ message: "USER_NOT_FOUND" });
//     return;
//   }
//   const updatedUser = await userRepository.updateUserByEmail(
//     userDetails,
//     email
//   );

//   if (!updatedUser) {
//     res
//       .status(STATUS.UNAUTHORIZED)
//       .json({ message: "USER_DOES_NOT_UPDATED" });
//     return;
//   }

//   res.status(STATUS.SUCCESS).json({ message: "USER_UPDATED_SUCCESSFULLY" });
// },
