namespace RRS_DataAccess.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class images7 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.RestaurantTables", "ImageName", c => c.String());
            AddColumn("dbo.RestaurantTables", "ImageExtension", c => c.String());
            AddColumn("dbo.RestaurantTables", "ImageBase64", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.RestaurantTables", "ImageBase64");
            DropColumn("dbo.RestaurantTables", "ImageExtension");
            DropColumn("dbo.RestaurantTables", "ImageName");
        }
    }
}
