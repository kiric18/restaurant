namespace RRS_DataAccess.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class changeIdToEnumId : DbMigration
    {
        public override void Up()
        {
            DropPrimaryKey("dbo.Ambiences");
            DropPrimaryKey("dbo.Amenities");
            DropPrimaryKey("dbo.Cuisines");
            DropPrimaryKey("dbo.PaymentMethods");
            DropPrimaryKey("dbo.RestaurantAmenities");
            DropPrimaryKey("dbo.RestaurantCuisines");
            DropPrimaryKey("dbo.RestaurantPaymentMethods");
            DropPrimaryKey("dbo.RestaurantStyles");
            DropPrimaryKey("dbo.RestaurantTablesAmbiences");
            DropPrimaryKey("dbo.Styles");
            AddColumn("dbo.Ambiences", "EnumId", c => c.Int(nullable: false));
            AddColumn("dbo.Amenities", "EnumId", c => c.Int(nullable: false));
            AddColumn("dbo.Cuisines", "EnumId", c => c.Int(nullable: false));
            AddColumn("dbo.PaymentMethods", "EnumId", c => c.Int(nullable: false));
            AddColumn("dbo.RestaurantAmenities", "EnumId", c => c.Int(nullable: false));
            AddColumn("dbo.RestaurantCuisines", "EnumId", c => c.Int(nullable: false));
            AddColumn("dbo.RestaurantCuisines", "DateAdded", c => c.DateTime(nullable: false));
            AddColumn("dbo.RestaurantCuisines", "DateModified", c => c.DateTime(nullable: false));
            AddColumn("dbo.RestaurantPaymentMethods", "EnumId", c => c.Int(nullable: false));
            AddColumn("dbo.RestaurantStyles", "EnumId", c => c.Int(nullable: false));
            AddColumn("dbo.RestaurantTablesAmbiences", "EnumId", c => c.Int(nullable: false));
            AddColumn("dbo.Styles", "EnumId", c => c.Int(nullable: false));
            AlterColumn("dbo.Ambiences", "Id", c => c.Int(nullable: false, identity: true));
            AlterColumn("dbo.Amenities", "Id", c => c.Int(nullable: false, identity: true));
            AlterColumn("dbo.Cuisines", "Id", c => c.Int(nullable: false, identity: true));
            AlterColumn("dbo.PaymentMethods", "Id", c => c.Int(nullable: false, identity: true));
            AlterColumn("dbo.RestaurantAmenities", "Id", c => c.Int(nullable: false, identity: true));
            AlterColumn("dbo.RestaurantCuisines", "Id", c => c.Int(nullable: false, identity: true));
            AlterColumn("dbo.RestaurantPaymentMethods", "Id", c => c.Int(nullable: false, identity: true));
            AlterColumn("dbo.RestaurantStyles", "Id", c => c.Int(nullable: false, identity: true));
            AlterColumn("dbo.RestaurantTablesAmbiences", "Id", c => c.Int(nullable: false, identity: true));
            AlterColumn("dbo.Styles", "Id", c => c.Int(nullable: false, identity: true));
            AddPrimaryKey("dbo.Ambiences", "Id");
            AddPrimaryKey("dbo.Amenities", "Id");
            AddPrimaryKey("dbo.Cuisines", "Id");
            AddPrimaryKey("dbo.PaymentMethods", "Id");
            AddPrimaryKey("dbo.RestaurantAmenities", "Id");
            AddPrimaryKey("dbo.RestaurantCuisines", "Id");
            AddPrimaryKey("dbo.RestaurantPaymentMethods", "Id");
            AddPrimaryKey("dbo.RestaurantStyles", "Id");
            AddPrimaryKey("dbo.RestaurantTablesAmbiences", "Id");
            AddPrimaryKey("dbo.Styles", "Id");
        }
        
        public override void Down()
        {
            DropPrimaryKey("dbo.Styles");
            DropPrimaryKey("dbo.RestaurantTablesAmbiences");
            DropPrimaryKey("dbo.RestaurantStyles");
            DropPrimaryKey("dbo.RestaurantPaymentMethods");
            DropPrimaryKey("dbo.RestaurantCuisines");
            DropPrimaryKey("dbo.RestaurantAmenities");
            DropPrimaryKey("dbo.PaymentMethods");
            DropPrimaryKey("dbo.Cuisines");
            DropPrimaryKey("dbo.Amenities");
            DropPrimaryKey("dbo.Ambiences");
            AlterColumn("dbo.Styles", "Id", c => c.Int(nullable: false));
            AlterColumn("dbo.RestaurantTablesAmbiences", "Id", c => c.Int(nullable: false));
            AlterColumn("dbo.RestaurantStyles", "Id", c => c.Int(nullable: false));
            AlterColumn("dbo.RestaurantPaymentMethods", "Id", c => c.Int(nullable: false));
            AlterColumn("dbo.RestaurantCuisines", "Id", c => c.Int(nullable: false));
            AlterColumn("dbo.RestaurantAmenities", "Id", c => c.Int(nullable: false));
            AlterColumn("dbo.PaymentMethods", "Id", c => c.Int(nullable: false));
            AlterColumn("dbo.Cuisines", "Id", c => c.Int(nullable: false));
            AlterColumn("dbo.Amenities", "Id", c => c.Int(nullable: false));
            AlterColumn("dbo.Ambiences", "Id", c => c.Int(nullable: false));
            DropColumn("dbo.Styles", "EnumId");
            DropColumn("dbo.RestaurantTablesAmbiences", "EnumId");
            DropColumn("dbo.RestaurantStyles", "EnumId");
            DropColumn("dbo.RestaurantPaymentMethods", "EnumId");
            DropColumn("dbo.RestaurantCuisines", "DateModified");
            DropColumn("dbo.RestaurantCuisines", "DateAdded");
            DropColumn("dbo.RestaurantCuisines", "EnumId");
            DropColumn("dbo.RestaurantAmenities", "EnumId");
            DropColumn("dbo.PaymentMethods", "EnumId");
            DropColumn("dbo.Cuisines", "EnumId");
            DropColumn("dbo.Amenities", "EnumId");
            DropColumn("dbo.Ambiences", "EnumId");
            AddPrimaryKey("dbo.Styles", "Id");
            AddPrimaryKey("dbo.RestaurantTablesAmbiences", "Id");
            AddPrimaryKey("dbo.RestaurantStyles", "Id");
            AddPrimaryKey("dbo.RestaurantPaymentMethods", "Id");
            AddPrimaryKey("dbo.RestaurantCuisines", "Id");
            AddPrimaryKey("dbo.RestaurantAmenities", "Id");
            AddPrimaryKey("dbo.PaymentMethods", "Id");
            AddPrimaryKey("dbo.Cuisines", "Id");
            AddPrimaryKey("dbo.Amenities", "Id");
            AddPrimaryKey("dbo.Ambiences", "Id");
        }
    }
}
