namespace RRS_DataAccess.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addNewTables : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.RestaurantAmenities",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        AmenitiesName = c.String(),
                        DateAdded = c.DateTime(nullable: false),
                        DateModified = c.DateTime(nullable: false),
                        Restaurant_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Restaurants", t => t.Restaurant_Id)
                .Index(t => t.Restaurant_Id);
            
            CreateTable(
                "dbo.RestaurantPaymentMethods",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        PaymentMethodName = c.String(),
                        DateAdded = c.DateTime(nullable: false),
                        DateModified = c.DateTime(nullable: false),
                        Restaurant_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Restaurants", t => t.Restaurant_Id)
                .Index(t => t.Restaurant_Id);
            
            CreateTable(
                "dbo.RestaurantStyles",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        StyleName = c.String(),
                        DateAdded = c.DateTime(nullable: false),
                        DateModified = c.DateTime(nullable: false),
                        Restaurant_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Restaurants", t => t.Restaurant_Id)
                .Index(t => t.Restaurant_Id);
            
            CreateTable(
                "dbo.RestaurantTablesAmbiences",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        AmbienceName = c.String(),
                        DateAdded = c.DateTime(nullable: false),
                        DateModified = c.DateTime(nullable: false),
                        RestaurantTables_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.RestaurantTables", t => t.RestaurantTables_Id)
                .Index(t => t.RestaurantTables_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.RestaurantTablesAmbiences", "RestaurantTables_Id", "dbo.RestaurantTables");
            DropForeignKey("dbo.RestaurantStyles", "Restaurant_Id", "dbo.Restaurants");
            DropForeignKey("dbo.RestaurantPaymentMethods", "Restaurant_Id", "dbo.Restaurants");
            DropForeignKey("dbo.RestaurantAmenities", "Restaurant_Id", "dbo.Restaurants");
            DropIndex("dbo.RestaurantTablesAmbiences", new[] { "RestaurantTables_Id" });
            DropIndex("dbo.RestaurantStyles", new[] { "Restaurant_Id" });
            DropIndex("dbo.RestaurantPaymentMethods", new[] { "Restaurant_Id" });
            DropIndex("dbo.RestaurantAmenities", new[] { "Restaurant_Id" });
            DropTable("dbo.RestaurantTablesAmbiences");
            DropTable("dbo.RestaurantStyles");
            DropTable("dbo.RestaurantPaymentMethods");
            DropTable("dbo.RestaurantAmenities");
        }
    }
}
