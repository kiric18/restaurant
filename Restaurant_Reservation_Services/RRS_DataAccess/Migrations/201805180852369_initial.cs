namespace RRS_DataAccess.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Admins",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Surname = c.String(),
                        Email = c.String(),
                        Username = c.String(),
                        Password = c.String(),
                        DateAdded = c.DateTime(nullable: false),
                        DateModified = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.RestaurantAlerts",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Message = c.String(),
                        DateAdded = c.DateTime(nullable: false),
                        DateModified = c.DateTime(nullable: false),
                        Restaurant_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Restaurants", t => t.Restaurant_Id)
                .Index(t => t.Restaurant_Id);
            
            CreateTable(
                "dbo.Restaurants",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Address = c.String(),
                        OpeningHours = c.String(),
                        PhoneNumber = c.String(),
                        Style = c.String(),
                        PaymentMethods = c.String(),
                        Amentities = c.String(),
                        Desrciption = c.String(),
                        DateAdded = c.DateTime(nullable: false),
                        DateModified = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.RestaurantManagers",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Email = c.String(nullable: false),
                        Username = c.String(),
                        Password = c.String(),
                        DateAdded = c.DateTime(nullable: false),
                        DateModified = c.DateTime(nullable: false),
                        Restaurant_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Restaurants", t => t.Restaurant_Id)
                .Index(t => t.Restaurant_Id);
            
            CreateTable(
                "dbo.RestaurantTables",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        TableNumber = c.Int(nullable: false),
                        PersonsNumber = c.Int(nullable: false),
                        Ambience = c.String(),
                        DateAdded = c.DateTime(nullable: false),
                        DateModified = c.DateTime(nullable: false),
                        Restaurant_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Restaurants", t => t.Restaurant_Id)
                .Index(t => t.Restaurant_Id);
            
            CreateTable(
                "dbo.UserBookings",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        DateTime = c.DateTime(nullable: false),
                        DateAdded = c.DateTime(nullable: false),
                        DateModified = c.DateTime(nullable: false),
                        Restaurant_Id = c.Int(),
                        RestaurantTables_Id = c.Int(),
                        User_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Restaurants", t => t.Restaurant_Id)
                .ForeignKey("dbo.RestaurantTables", t => t.RestaurantTables_Id)
                .ForeignKey("dbo.Users", t => t.User_Id)
                .Index(t => t.Restaurant_Id)
                .Index(t => t.RestaurantTables_Id)
                .Index(t => t.User_Id);
            
            CreateTable(
                "dbo.Users",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        FirstName = c.String(),
                        LastName = c.String(),
                        Gender = c.String(),
                        Birthday = c.DateTime(nullable: false),
                        PhoneNumber = c.String(),
                        Email = c.String(nullable: false),
                        City = c.String(),
                        Country = c.String(),
                        Address = c.String(),
                        Username = c.String(),
                        Password = c.String(),
                        DateAdded = c.DateTime(nullable: false),
                        DateModified = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.UserFavoriteRestaurnats",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        DateAdded = c.DateTime(nullable: false),
                        DateModified = c.DateTime(nullable: false),
                        Restaurant_Id = c.Int(),
                        User_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Restaurants", t => t.Restaurant_Id)
                .ForeignKey("dbo.Users", t => t.User_Id)
                .Index(t => t.Restaurant_Id)
                .Index(t => t.User_Id);
            
            CreateTable(
                "dbo.UserRestaurnatReviews",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Description = c.String(),
                        OverallRating = c.String(),
                        Food = c.Int(nullable: false),
                        Service = c.Int(nullable: false),
                        Environment = c.Int(nullable: false),
                        Price = c.Int(nullable: false),
                        DateAdded = c.DateTime(nullable: false),
                        DateModified = c.DateTime(nullable: false),
                        Restaurant_Id = c.Int(),
                        User_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Restaurants", t => t.Restaurant_Id)
                .ForeignKey("dbo.Users", t => t.User_Id)
                .Index(t => t.Restaurant_Id)
                .Index(t => t.User_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.UserRestaurnatReviews", "User_Id", "dbo.Users");
            DropForeignKey("dbo.UserRestaurnatReviews", "Restaurant_Id", "dbo.Restaurants");
            DropForeignKey("dbo.UserFavoriteRestaurnats", "User_Id", "dbo.Users");
            DropForeignKey("dbo.UserFavoriteRestaurnats", "Restaurant_Id", "dbo.Restaurants");
            DropForeignKey("dbo.UserBookings", "User_Id", "dbo.Users");
            DropForeignKey("dbo.UserBookings", "RestaurantTables_Id", "dbo.RestaurantTables");
            DropForeignKey("dbo.UserBookings", "Restaurant_Id", "dbo.Restaurants");
            DropForeignKey("dbo.RestaurantTables", "Restaurant_Id", "dbo.Restaurants");
            DropForeignKey("dbo.RestaurantManagers", "Restaurant_Id", "dbo.Restaurants");
            DropForeignKey("dbo.RestaurantAlerts", "Restaurant_Id", "dbo.Restaurants");
            DropIndex("dbo.UserRestaurnatReviews", new[] { "User_Id" });
            DropIndex("dbo.UserRestaurnatReviews", new[] { "Restaurant_Id" });
            DropIndex("dbo.UserFavoriteRestaurnats", new[] { "User_Id" });
            DropIndex("dbo.UserFavoriteRestaurnats", new[] { "Restaurant_Id" });
            DropIndex("dbo.UserBookings", new[] { "User_Id" });
            DropIndex("dbo.UserBookings", new[] { "RestaurantTables_Id" });
            DropIndex("dbo.UserBookings", new[] { "Restaurant_Id" });
            DropIndex("dbo.RestaurantTables", new[] { "Restaurant_Id" });
            DropIndex("dbo.RestaurantManagers", new[] { "Restaurant_Id" });
            DropIndex("dbo.RestaurantAlerts", new[] { "Restaurant_Id" });
            DropTable("dbo.UserRestaurnatReviews");
            DropTable("dbo.UserFavoriteRestaurnats");
            DropTable("dbo.Users");
            DropTable("dbo.UserBookings");
            DropTable("dbo.RestaurantTables");
            DropTable("dbo.RestaurantManagers");
            DropTable("dbo.Restaurants");
            DropTable("dbo.RestaurantAlerts");
            DropTable("dbo.Admins");
        }
    }
}
