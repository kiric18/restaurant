namespace RRS_DataAccess.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class images3 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.RestaurnatImages", "ImageName", c => c.String());
            AddColumn("dbo.RestaurnatImages", "ImageUrl", c => c.String());
            AddColumn("dbo.RestaurnatImages", "ImageBase64", c => c.String());
            DropColumn("dbo.RestaurnatImages", "Image");
        }
        
        public override void Down()
        {
            AddColumn("dbo.RestaurnatImages", "Image", c => c.String());
            DropColumn("dbo.RestaurnatImages", "ImageBase64");
            DropColumn("dbo.RestaurnatImages", "ImageUrl");
            DropColumn("dbo.RestaurnatImages", "ImageName");
        }
    }
}
