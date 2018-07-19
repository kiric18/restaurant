namespace RRS_DataAccess.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addBaseEntity : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.RestaurantAmenities", "DateAdded", c => c.DateTime(nullable: false));
            AddColumn("dbo.RestaurantAmenities", "DateModified", c => c.DateTime(nullable: false));
            AddColumn("dbo.RestaurantCuisines", "DateAdded", c => c.DateTime(nullable: false));
            AddColumn("dbo.RestaurantCuisines", "DateModified", c => c.DateTime(nullable: false));
            AddColumn("dbo.RestaurantPaymentMethods", "DateAdded", c => c.DateTime(nullable: false));
            AddColumn("dbo.RestaurantPaymentMethods", "DateModified", c => c.DateTime(nullable: false));
            AddColumn("dbo.RestaurantStyles", "DateAdded", c => c.DateTime(nullable: false));
            AddColumn("dbo.RestaurantStyles", "DateModified", c => c.DateTime(nullable: false));
            AddColumn("dbo.RestaurantTablesAmbiences", "DateAdded", c => c.DateTime(nullable: false));
            AddColumn("dbo.RestaurantTablesAmbiences", "DateModified", c => c.DateTime(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.RestaurantTablesAmbiences", "DateModified");
            DropColumn("dbo.RestaurantTablesAmbiences", "DateAdded");
            DropColumn("dbo.RestaurantStyles", "DateModified");
            DropColumn("dbo.RestaurantStyles", "DateAdded");
            DropColumn("dbo.RestaurantPaymentMethods", "DateModified");
            DropColumn("dbo.RestaurantPaymentMethods", "DateAdded");
            DropColumn("dbo.RestaurantCuisines", "DateModified");
            DropColumn("dbo.RestaurantCuisines", "DateAdded");
            DropColumn("dbo.RestaurantAmenities", "DateModified");
            DropColumn("dbo.RestaurantAmenities", "DateAdded");
        }
    }
}
