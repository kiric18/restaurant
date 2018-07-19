namespace RRS_DataAccess.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class changePropertiesType3 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.RestaurantTables", "Ambience", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.RestaurantTables", "Ambience");
        }
    }
}
