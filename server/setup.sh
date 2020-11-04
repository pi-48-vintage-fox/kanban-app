# npx sequelize model:create --name User --attributes name:string,username:string,email:string,password:string,OrganizationId:integer,avatarUrl:string

# npx sequelize model:create --name Task --attributes title:string,description:string,CategoryId:integer,UserId:integer,OrganizationId:integer

# npx sequelize model:create --name Category --attributes name:string,OrganizationId:integer

# npx sequelize model:create --name Organization --attributes name:string

# npx sequelize seed:create --name seed-orgs
# npx sequelize seed:create --name seed-users
npx sequelize seed:create --name seed-categories