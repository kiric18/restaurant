namespace RRS_DataAccess.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addNewTables1 : DbMigration
    {
        public override void Up()
        {
            DropPrimaryKey("dbo.RestaurantAmenities");
            DropPrimaryKey("dbo.RestaurantPaymentMethods");
            DropPrimaryKey("dbo.RestaurantStyles");
            DropPrimaryKey("dbo.RestaurantTablesAmbiences");
            CreateTable(
                "dbo.Ambiences",
                c => new
                    {
                        Id = c.Int(nullable: false),
                        Name = c.String(),
                        Description = c.String(),
                        DateAdded = c.DateTime(nullable: false),
                        DateModified = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Amenities",
                c => new
                    {
                        Id = c.Int(nullable: false),
                        Name = c.String(),
                        Description = c.String(),
                        DateAdded = c.DateTime(nullable: false),
                        DateModified = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Cuisines",
                c => new
                    {
                        Id = c.Int(nullable: false),
                        Name = c.String(),
                        Description = c.String(),
                        DateAdded = c.DateTime(nullable: false),
                        DateModified = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.PaymentMethods",
                c => new
                    {
                        Id = c.Int(nullable: false),
                        Name = c.String(),
                        Description = c.String(),
                        DateAdded = c.DateTime(nullable: false),
                        DateModified = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.RestaurantCuisines",
                c => new
                    {
                        Id = c.Int(nullable: false),
                        Name = c.String(),
                        Description = c.String(),
                        Restaurant_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Restaurants", t => t.Restaurant_Id)
                .Index(t => t.Restaurant_Id);
            
            CreateTable(
                "dbo.Styles",
                c => new
                    {
                        Id = c.Int(nullable: false),
                        Name = c.String(),
                        Description = c.String(),
                        DateAdded = c.DateTime(nullable: false),
                        DateModified = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            AddColumn("dbo.RestaurantAmenities", "Description", c => c.String());
            AddColumn("dbo.RestaurantPaymentMethods", "Description", c => c.String());
            AddColumn("dbo.RestaurantStyles", "Description", c => c.String());
            AddColumn("dbo.RestaurantTablesAmbiences", "Description", c => c.String());
            AlterColumn("dbo.RestaurantAmenities", "Id", c => c.Int(nullable: false));
            AlterColumn("dbo.RestaurantPaymentMethods", "Id", c => c.Int(nullable: false));
            AlterColumn("dbo.RestaurantStyles", "Id", c => c.Int(nullable: false));
            AlterColumn("dbo.RestaurantTablesAmbiences", "Id", c => c.Int(nullable: false));
            AddPrimaryKey("dbo.RestaurantAmenities", "Id");
            AddPrimaryKey("dbo.RestaurantPaymentMethods", "Id");
            AddPrimaryKey("dbo.RestaurantStyles", "Id");
            AddPrimaryKey("dbo.RestaurantTablesAmbiences", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.RestaurantCuisines", "Restaurant_Id", "dbo.Restaurants");
            DropIndex("dbo.RestaurantCuisines", new[] { "Restaurant_Id" });
            DropPrimaryKey("dbo.RestaurantTablesAmbiences");
            DropPrimaryKey("dbo.RestaurantStyles");
            DropPrimaryKey("dbo.RestaurantPaymentMethods");
            DropPrimaryKey("dbo.RestaurantAmenities");
            AlterColumn("dbo.RestaurantTablesAmbiences", "Id", c => c.Int(nullable: false, identity: true));
            AlterColumn("dbo.RestaurantStyles", "Id", c => c.Int(nullable: false, identity: true));
            AlterColumn("dbo.RestaurantPaymentMethods", "Id", c => c.Int(nullable: false, identity: true));
            AlterColumn("dbo.RestaurantAmenities", "Id", c => c.Int(nullable: false, identity: true));
            DropColumn("dbo.RestaurantTablesAmbiences", "Description");
            DropColumn("dbo.RestaurantStyles", "Description");
            DropColumn("dbo.RestaurantPaymentMethods", "Description");
            DropColumn("dbo.RestaurantAmenities", "Description");
            DropTable("dbo.Styles");
            DropTable("dbo.RestaurantCuisines");
            DropTable("dbo.PaymentMethods");
            DropTable("dbo.Cuisines");
            DropTable("dbo.Amenities");
            DropTable("dbo.Ambiences");
            AddPrimaryKey("dbo.RestaurantTablesAmbiences", "Id");
            AddPrimaryKey("dbo.RestaurantStyles", "Id");
            AddPrimaryKey("dbo.RestaurantPaymentMethods", "Id");
            AddPrimaryKey("dbo.RestaurantAmenities", "Id");
        }
    }
}
