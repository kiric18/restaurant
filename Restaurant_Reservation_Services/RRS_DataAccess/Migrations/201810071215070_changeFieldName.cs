namespace RRS_DataAccess.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class changeFieldName : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.RestaurantTables", "IsBooking", c => c.Boolean(nullable: false));
            DropColumn("dbo.RestaurantTables", "IsAvailable");
        }
        
        public override void Down()
        {
            AddColumn("dbo.RestaurantTables", "IsAvailable", c => c.Boolean(nullable: false));
            DropColumn("dbo.RestaurantTables", "IsBooking");
        }
    }
}
