namespace RRS_DataAccess.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class UpdateStylesManyToMany2 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.RestaurantStyles", "StyleId", c => c.Int(nullable: false));
            CreateIndex("dbo.RestaurantStyles", "StyleId");
            AddForeignKey("dbo.RestaurantStyles", "StyleId", "dbo.Styles", "Id", cascadeDelete: true);
            DropColumn("dbo.RestaurantStyles", "Style");
        }
        
        public override void Down()
        {
            AddColumn("dbo.RestaurantStyles", "Style", c => c.Int(nullable: false));
            DropForeignKey("dbo.RestaurantStyles", "StyleId", "dbo.Styles");
            DropIndex("dbo.RestaurantStyles", new[] { "StyleId" });
            DropColumn("dbo.RestaurantStyles", "StyleId");
        }
    }
}
