namespace RRS_DataAccess.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class updateTableCuisine : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.RestaurantCuisines", "DateAdded");
            DropColumn("dbo.RestaurantCuisines", "DateModified");
        }
        
        public override void Down()
        {
            AddColumn("dbo.RestaurantCuisines", "DateModified", c => c.DateTime(nullable: false));
            AddColumn("dbo.RestaurantCuisines", "DateAdded", c => c.DateTime(nullable: false));
        }
    }
}
