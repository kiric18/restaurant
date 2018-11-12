namespace RRS_DataAccess.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class internalName : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Restaurants", "RestaurantInternalName", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Restaurants", "RestaurantInternalName");
        }
    }
}
