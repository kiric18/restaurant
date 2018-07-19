namespace RRS_DataAccess.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addNewTable3 : DbMigration
    {
        public override void Up()
        {
            RenameTable(name: "dbo.RestaurantCuisines", newName: "RestaurantCuisines2");
        }
        
        public override void Down()
        {
            RenameTable(name: "dbo.RestaurantCuisines2", newName: "RestaurantCuisines");
        }
    }
}
