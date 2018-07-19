namespace RRS_DataAccess.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class UpdateStylesManyToMany : DbMigration
    {
        public override void Up()
        {
            DropPrimaryKey("dbo.RestaurantStyles");
            AddColumn("dbo.RestaurantStyles", "Style", c => c.Int(nullable: false));
            AlterColumn("dbo.RestaurantStyles", "Id", c => c.Int(nullable: false, identity: true));
            AddPrimaryKey("dbo.RestaurantStyles", "Id");
            DropColumn("dbo.RestaurantStyles", "Name");
            DropColumn("dbo.RestaurantStyles", "Description");
        }
        
        public override void Down()
        {
            AddColumn("dbo.RestaurantStyles", "Description", c => c.String());
            AddColumn("dbo.RestaurantStyles", "Name", c => c.String());
            DropPrimaryKey("dbo.RestaurantStyles");
            AlterColumn("dbo.RestaurantStyles", "Id", c => c.Int(nullable: false));
            DropColumn("dbo.RestaurantStyles", "Style");
            AddPrimaryKey("dbo.RestaurantStyles", "Id");
        }
    }
}
