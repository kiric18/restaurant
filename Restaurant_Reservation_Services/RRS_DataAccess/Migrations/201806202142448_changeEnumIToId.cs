namespace RRS_DataAccess.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class changeEnumIToId : DbMigration
    {
        public override void Up()
        {
            DropPrimaryKey("dbo.RestaurantAmenities");
            DropPrimaryKey("dbo.RestaurantCuisines");
            DropPrimaryKey("dbo.RestaurantPaymentMethods");
            DropPrimaryKey("dbo.RestaurantStyles");
            DropPrimaryKey("dbo.RestaurantTablesAmbiences");
            AlterColumn("dbo.RestaurantAmenities", "Id", c => c.Int(nullable: false));
            AlterColumn("dbo.RestaurantCuisines", "Id", c => c.Int(nullable: false));
            AlterColumn("dbo.RestaurantPaymentMethods", "Id", c => c.Int(nullable: false));
            AlterColumn("dbo.RestaurantStyles", "Id", c => c.Int(nullable: false));
            AlterColumn("dbo.RestaurantTablesAmbiences", "Id", c => c.Int(nullable: false));
            AddPrimaryKey("dbo.RestaurantAmenities", "Id");
            AddPrimaryKey("dbo.RestaurantCuisines", "Id");
            AddPrimaryKey("dbo.RestaurantPaymentMethods", "Id");
            AddPrimaryKey("dbo.RestaurantStyles", "Id");
            AddPrimaryKey("dbo.RestaurantTablesAmbiences", "Id");
            DropColumn("dbo.RestaurantAmenities", "EnumId");
            DropColumn("dbo.RestaurantAmenities", "DateAdded");
            DropColumn("dbo.RestaurantAmenities", "DateModified");
            DropColumn("dbo.RestaurantCuisines", "EnumId");
            DropColumn("dbo.RestaurantCuisines", "DateAdded");
            DropColumn("dbo.RestaurantCuisines", "DateModified");
            DropColumn("dbo.RestaurantPaymentMethods", "EnumId");
            DropColumn("dbo.RestaurantPaymentMethods", "DateAdded");
            DropColumn("dbo.RestaurantPaymentMethods", "DateModified");
            DropColumn("dbo.RestaurantStyles", "EnumId");
            DropColumn("dbo.RestaurantStyles", "DateAdded");
            DropColumn("dbo.RestaurantStyles", "DateModified");
            DropColumn("dbo.RestaurantTablesAmbiences", "EnumId");
            DropColumn("dbo.RestaurantTablesAmbiences", "DateAdded");
            DropColumn("dbo.RestaurantTablesAmbiences", "DateModified");
        }
        
        public override void Down()
        {
            AddColumn("dbo.RestaurantTablesAmbiences", "DateModified", c => c.DateTime(nullable: false));
            AddColumn("dbo.RestaurantTablesAmbiences", "DateAdded", c => c.DateTime(nullable: false));
            AddColumn("dbo.RestaurantTablesAmbiences", "EnumId", c => c.Int(nullable: false));
            AddColumn("dbo.RestaurantStyles", "DateModified", c => c.DateTime(nullable: false));
            AddColumn("dbo.RestaurantStyles", "DateAdded", c => c.DateTime(nullable: false));
            AddColumn("dbo.RestaurantStyles", "EnumId", c => c.Int(nullable: false));
            AddColumn("dbo.RestaurantPaymentMethods", "DateModified", c => c.DateTime(nullable: false));
            AddColumn("dbo.RestaurantPaymentMethods", "DateAdded", c => c.DateTime(nullable: false));
            AddColumn("dbo.RestaurantPaymentMethods", "EnumId", c => c.Int(nullable: false));
            AddColumn("dbo.RestaurantCuisines", "DateModified", c => c.DateTime(nullable: false));
            AddColumn("dbo.RestaurantCuisines", "DateAdded", c => c.DateTime(nullable: false));
            AddColumn("dbo.RestaurantCuisines", "EnumId", c => c.Int(nullable: false));
            AddColumn("dbo.RestaurantAmenities", "DateModified", c => c.DateTime(nullable: false));
            AddColumn("dbo.RestaurantAmenities", "DateAdded", c => c.DateTime(nullable: false));
            AddColumn("dbo.RestaurantAmenities", "EnumId", c => c.Int(nullable: false));
            DropPrimaryKey("dbo.RestaurantTablesAmbiences");
            DropPrimaryKey("dbo.RestaurantStyles");
            DropPrimaryKey("dbo.RestaurantPaymentMethods");
            DropPrimaryKey("dbo.RestaurantCuisines");
            DropPrimaryKey("dbo.RestaurantAmenities");
            AlterColumn("dbo.RestaurantTablesAmbiences", "Id", c => c.Int(nullable: false, identity: true));
            AlterColumn("dbo.RestaurantStyles", "Id", c => c.Int(nullable: false, identity: true));
            AlterColumn("dbo.RestaurantPaymentMethods", "Id", c => c.Int(nullable: false, identity: true));
            AlterColumn("dbo.RestaurantCuisines", "Id", c => c.Int(nullable: false, identity: true));
            AlterColumn("dbo.RestaurantAmenities", "Id", c => c.Int(nullable: false, identity: true));
            AddPrimaryKey("dbo.RestaurantTablesAmbiences", "Id");
            AddPrimaryKey("dbo.RestaurantStyles", "Id");
            AddPrimaryKey("dbo.RestaurantPaymentMethods", "Id");
            AddPrimaryKey("dbo.RestaurantCuisines", "Id");
            AddPrimaryKey("dbo.RestaurantAmenities", "Id");
        }
    }
}
