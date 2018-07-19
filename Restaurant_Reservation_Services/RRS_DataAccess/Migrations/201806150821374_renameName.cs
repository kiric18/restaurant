namespace RRS_DataAccess.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class renameName : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.RestaurantAmenities", "Name", c => c.String());
            AddColumn("dbo.RestaurantPaymentMethods", "Name", c => c.String());
            AddColumn("dbo.RestaurantStyles", "Name", c => c.String());
            AddColumn("dbo.RestaurantTablesAmbiences", "Name", c => c.String());
            DropColumn("dbo.RestaurantAmenities", "AmenitiesName");
            DropColumn("dbo.RestaurantPaymentMethods", "PaymentMethodName");
            DropColumn("dbo.RestaurantStyles", "StyleName");
            DropColumn("dbo.RestaurantTablesAmbiences", "AmbienceName");
        }
        
        public override void Down()
        {
            AddColumn("dbo.RestaurantTablesAmbiences", "AmbienceName", c => c.String());
            AddColumn("dbo.RestaurantStyles", "StyleName", c => c.String());
            AddColumn("dbo.RestaurantPaymentMethods", "PaymentMethodName", c => c.String());
            AddColumn("dbo.RestaurantAmenities", "AmenitiesName", c => c.String());
            DropColumn("dbo.RestaurantTablesAmbiences", "Name");
            DropColumn("dbo.RestaurantStyles", "Name");
            DropColumn("dbo.RestaurantPaymentMethods", "Name");
            DropColumn("dbo.RestaurantAmenities", "Name");
        }
    }
}
