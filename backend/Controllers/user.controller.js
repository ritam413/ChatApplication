// import chalk from "chalk"
// import User from "../models/user.model.js";
// export const getUsersForSideBar = async (req, res) => {
//     try {
//         const loggedInUserId =  req.user._id;
        
//         const allUser = await User.find({_id:loggedInUserId})

//         const filteredUserExcludingSender = await User.find({ _id: { $ne: loggedInUserId } })

        
//         console.log(chalk.green(filteredUserExcludingSender))
//         filteredUserExcludingSender.forEach((user) => {
//             if(user.fullname === 'undefined') console.log(user._id)
//             console.log(chalk.blue(`UserName:${user.fullname}\t ProfilePic:${user.profilepic}\n`))})

//         res.status(200).json(filteredUserExcludingSender)

//     } catch (error) {
//         console.log(chalk.underline('Error in getMessages of message.controller:  ', error.message))
//         res.status(500).json({ message: 'Error Getting SideUser,Internal Server Error in user.controler.js' })
//     }
// }


import User from "../models/user.model.js";

export const getUsersForSideBar = async (req, res) => {
	try {
		const loggedInUserId = req.user._id;

		const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

		res.status(200).json(filteredUsers);
	} catch (error) {
		console.error("Error in getUsersForSidebar: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};