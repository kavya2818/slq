const Sequelize = require("sequelize");
const sequelize = require("../util/database");

	
const Leave = sequelize.define("leave", {
	start_date: {
		type: Sequelize.INTEGER,
		primaryKey: true
	},
	end_date: {
		type: Sequelize.INTEGER,
		primaryKey: true
	},
	
	noOfLeaves:{
    type:Sequelize.INTEGER,
    defaultValue:10,
    primaryKey: true
  },
	approval_status: {
			type:Sequelize.STRING,
			enum: ['PENDING', 'APPROVED', 'REJECTED'],
			defaultValue: 'PENDING'
	},
});

module.exports = Leave;
