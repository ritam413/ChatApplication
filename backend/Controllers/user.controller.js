import User from "../models/user.model.js";
import { uploadResultonCloudinary } from '../utils/cloudinary.js'
import { asyncHandler } from '../utils/asyncHandler.js'


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

export const updateUserProfile = asyncHandler(async (req, res) => {
	const userId = req.user._id;
	const { fullname, gender, description } = req.body;

	const user = await User.findById(userId);
	if (!user) return res.status(404).json({ message: 'User Not Found' })

	const changes = {}; // store what changed

	if (fullname && fullname !== user.fullname) {
		changes.fullname = { old: user.fullname, new: fullname };
		user.fullname = fullname;
	}

	if (description && description !== user.description) {
		changes.description = { old: user.description, new: description };
		user.description = description;
	}

	if (gender && gender !== user.gender) {
		changes.gender = { old: user.gender, new: gender };
		user.gender = gender;
	}

	if (req.file) {
		const localFilePath = req.file.path;
		const cloudinaryUrl = await uploadResultonCloudinary(localFilePath);
		if (cloudinaryUrl ) {
			if(cloudinaryUrl !== user.profilepic){
				changes.profilepic = { message:"ProfilePicture Updated Successfully"};
				user.profilepic = cloudinaryUrl;
			}
		}
	}
	
	await user.save()

	res.status(200).json({
		message: 'Profile updated successfully',
		changes,
	})

})