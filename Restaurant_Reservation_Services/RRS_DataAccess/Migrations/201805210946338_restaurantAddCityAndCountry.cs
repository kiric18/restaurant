namespace RRS_DataAccess.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class restaurantAddCityAndCountry : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Restaurants", "City", c => c.String());
            AddColumn("dbo.Restaurants", "Country", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Restaurants", "Country");
            DropColumn("dbo.Restaurants", "City");
        }
    }
}
