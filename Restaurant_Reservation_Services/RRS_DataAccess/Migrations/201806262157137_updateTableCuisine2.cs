namespace RRS_DataAccess.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class updateTableCuisine2 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.RestaurantCuisines", "DateAdded", c => c.DateTime(nullable: false));
            AddColumn("dbo.RestaurantCuisines", "DateModified", c => c.DateTime(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.RestaurantCuisines", "DateModified");
            DropColumn("dbo.RestaurantCuisines", "DateAdded");
        }
    }
}
