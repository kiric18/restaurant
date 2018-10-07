namespace RRS_DataAccess.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class changeFieldName3 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.UserBookings", "IsActive", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.UserBookings", "IsActive");
        }
    }
}
