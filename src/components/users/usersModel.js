export default function UsersModel (sequelize, DataTypes) {
  const User = sequelize.define('user', {
    name: {
      type: DataTypes.CHAR(30),
      allowNull: false,
      unique: true
    },
    avatar: {
      type: DataTypes.CHAR(100)
    }
  })

  User.associate = (models) => {

  }

  return User
}