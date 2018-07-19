namespace RRS_DataAccess.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class changePropertiesType2 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Restaurants", "Style", c => c.String());
            AddColumn("dbo.Restaurants", "PaymentMethods", c => c.String());
            AddColumn("dbo.Restaurants", "Amenities", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Restaurants", "Amenities");
            DropColumn("dbo.Restaurants", "PaymentMethods");
            DropColumn("dbo.Restaurants", "Style");
        }
    }
}
