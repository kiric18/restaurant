namespace RRS_DataAccess.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addManagerName : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Restaurants", "RestaurantName", c => c.String());
            AddColumn("dbo.RestaurantManagers", "ManagerName", c => c.String());
            DropColumn("dbo.Restaurants", "Name");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Restaurants", "Name", c => c.String());
            DropColumn("dbo.RestaurantManagers", "ManagerName");
            DropColumn("dbo.Restaurants", "RestaurantName");
        }
    }
}
