namespace RRS_DataAccess.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class changeAmbience : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.RestaurantTables", "Ambience", c => c.String());
            AddColumn("dbo.RestaurantTables", "IsAvailable", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.RestaurantTables", "IsAvailable");
            DropColumn("dbo.RestaurantTables", "Ambience");
        }
    }
}
