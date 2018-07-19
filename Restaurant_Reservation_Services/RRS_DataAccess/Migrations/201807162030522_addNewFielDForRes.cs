namespace RRS_DataAccess.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addNewFielDForRes : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Restaurants", "IsActive", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Restaurants", "IsActive");
        }
    }
}
