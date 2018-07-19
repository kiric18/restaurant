namespace RRS_DataAccess.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class changePropertiesType4 : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.Restaurants", "Style");
            DropColumn("dbo.Restaurants", "PaymentMethods");
            DropColumn("dbo.Restaurants", "Amenities");
            DropColumn("dbo.RestaurantTables", "Ambience");
        }
        
        public override void Down()
        {
            AddColumn("dbo.RestaurantTables", "Ambience", c => c.String());
            AddColumn("dbo.Restaurants", "Amenities", c => c.String());
            AddColumn("dbo.Restaurants", "PaymentMethods", c => c.String());
            AddColumn("dbo.Restaurants", "Style", c => c.String());
        }
    }
}
