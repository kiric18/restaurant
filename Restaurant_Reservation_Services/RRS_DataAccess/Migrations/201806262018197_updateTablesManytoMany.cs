namespace RRS_DataAccess.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class updateTablesManytoMany : DbMigration
    {
        public override void Up()
        {
            DropPrimaryKey("dbo.RestaurantAmenities");
            DropPrimaryKey("dbo.RestaurantCuisines");
            DropPrimaryKey("dbo.RestaurantPaymentMethods");
            DropPrimaryKey("dbo.RestaurantTablesAmbiences");
            AddColumn("dbo.RestaurantAmenities", "AmenitieId", c => c.Int(nullable: false));
            AddColumn("dbo.RestaurantCuisines", "CuisineId", c => c.Int(nullable: false));
            AddColumn("dbo.RestaurantPaymentMethods", "PaymentMethodId", c => c.Int(nullable: false));
            AddColumn("dbo.RestaurantTablesAmbiences", "AmbienceId", c => c.Int(nullable: false));
            AlterColumn("dbo.RestaurantAmenities", "Id", c => c.Int(nullable: false, identity: true));
            AlterColumn("dbo.RestaurantCuisines", "Id", c => c.Int(nullable: false, identity: true));
            AlterColumn("dbo.RestaurantPaymentMethods", "Id", c => c.Int(nullable: false, identity: true));
            AlterColumn("dbo.RestaurantTablesAmbiences", "Id", c => c.Int(nullable: false, identity: true));
            AddPrimaryKey("dbo.RestaurantAmenities", "Id");
            AddPrimaryKey("dbo.RestaurantCuisines", "Id");
            AddPrimaryKey("dbo.RestaurantPaymentMethods", "Id");
            AddPrimaryKey("dbo.RestaurantTablesAmbiences", "Id");
            CreateIndex("dbo.RestaurantAmenities", "AmenitieId");
            CreateIndex("dbo.RestaurantCuisines", "CuisineId");
            CreateIndex("dbo.RestaurantPaymentMethods", "PaymentMethodId");
            CreateIndex("dbo.RestaurantTablesAmbiences", "AmbienceId");
            AddForeignKey("dbo.RestaurantAmenities", "AmenitieId", "dbo.Amenities", "Id", cascadeDelete: true);
            AddForeignKey("dbo.RestaurantCuisines", "CuisineId", "dbo.Cuisines", "Id", cascadeDelete: true);
            AddForeignKey("dbo.RestaurantPaymentMethods", "PaymentMethodId", "dbo.PaymentMethods", "Id", cascadeDelete: true);
            AddForeignKey("dbo.RestaurantTablesAmbiences", "AmbienceId", "dbo.Ambiences", "Id", cascadeDelete: true);
            DropColumn("dbo.RestaurantAmenities", "Name");
            DropColumn("dbo.RestaurantAmenities", "Description");
            DropColumn("dbo.RestaurantCuisines", "Name");
            DropColumn("dbo.RestaurantCuisines", "Description");
            DropColumn("dbo.RestaurantPaymentMethods", "Name");
            DropColumn("dbo.RestaurantPaymentMethods", "Description");
            DropColumn("dbo.RestaurantTablesAmbiences", "Name");
            DropColumn("dbo.RestaurantTablesAmbiences", "Description");
        }
        
        public override void Down()
        {
            AddColumn("dbo.RestaurantTablesAmbiences", "Description", c => c.String());
            AddColumn("dbo.RestaurantTablesAmbiences", "Name", c => c.String());
            AddColumn("dbo.RestaurantPaymentMethods", "Description", c => c.String());
            AddColumn("dbo.RestaurantPaymentMethods", "Name", c => c.String());
            AddColumn("dbo.RestaurantCuisines", "Description", c => c.String());
            AddColumn("dbo.RestaurantCuisines", "Name", c => c.String());
            AddColumn("dbo.RestaurantAmenities", "Description", c => c.String());
            AddColumn("dbo.RestaurantAmenities", "Name", c => c.String());
            DropForeignKey("dbo.RestaurantTablesAmbiences", "AmbienceId", "dbo.Ambiences");
            DropForeignKey("dbo.RestaurantPaymentMethods", "PaymentMethodId", "dbo.PaymentMethods");
            DropForeignKey("dbo.RestaurantCuisines", "CuisineId", "dbo.Cuisines");
            DropForeignKey("dbo.RestaurantAmenities", "AmenitieId", "dbo.Amenities");
            DropIndex("dbo.RestaurantTablesAmbiences", new[] { "AmbienceId" });
            DropIndex("dbo.RestaurantPaymentMethods", new[] { "PaymentMethodId" });
            DropIndex("dbo.RestaurantCuisines", new[] { "CuisineId" });
            DropIndex("dbo.RestaurantAmenities", new[] { "AmenitieId" });
            DropPrimaryKey("dbo.RestaurantTablesAmbiences");
            DropPrimaryKey("dbo.RestaurantPaymentMethods");
            DropPrimaryKey("dbo.RestaurantCuisines");
            DropPrimaryKey("dbo.RestaurantAmenities");
            AlterColumn("dbo.RestaurantTablesAmbiences", "Id", c => c.Int(nullable: false));
            AlterColumn("dbo.RestaurantPaymentMethods", "Id", c => c.Int(nullable: false));
            AlterColumn("dbo.RestaurantCuisines", "Id", c => c.Int(nullable: false));
            AlterColumn("dbo.RestaurantAmenities", "Id", c => c.Int(nullable: false));
            DropColumn("dbo.RestaurantTablesAmbiences", "AmbienceId");
            DropColumn("dbo.RestaurantPaymentMethods", "PaymentMethodId");
            DropColumn("dbo.RestaurantCuisines", "CuisineId");
            DropColumn("dbo.RestaurantAmenities", "AmenitieId");
            AddPrimaryKey("dbo.RestaurantTablesAmbiences", "Id");
            AddPrimaryKey("dbo.RestaurantPaymentMethods", "Id");
            AddPrimaryKey("dbo.RestaurantCuisines", "Id");
            AddPrimaryKey("dbo.RestaurantAmenities", "Id");
        }
    }
}
