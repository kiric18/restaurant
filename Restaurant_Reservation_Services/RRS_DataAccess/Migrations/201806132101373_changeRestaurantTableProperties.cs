namespace RRS_DataAccess.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class changeRestaurantTableProperties : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.RestaurantTables", "NumberOfTable", c => c.String());
            AddColumn("dbo.RestaurantTables", "NumberOfPersons", c => c.String());
            DropColumn("dbo.RestaurantTables", "TableNumber");
            DropColumn("dbo.RestaurantTables", "PersonsNumber");
        }
        
        public override void Down()
        {
            AddColumn("dbo.RestaurantTables", "PersonsNumber", c => c.Int(nullable: false));
            AddColumn("dbo.RestaurantTables", "TableNumber", c => c.Int(nullable: false));
            DropColumn("dbo.RestaurantTables", "NumberOfPersons");
            DropColumn("dbo.RestaurantTables", "NumberOfTable");
        }
    }
}
