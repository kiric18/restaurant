namespace RRS_DataAccess.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class renameDescription : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Restaurants", "Description", c => c.String());
            DropColumn("dbo.Restaurants", "Desrciption");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Restaurants", "Desrciption", c => c.String());
            DropColumn("dbo.Restaurants", "Description");
        }
    }
}
