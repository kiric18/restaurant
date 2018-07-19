namespace RRS_DataAccess.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class changeId : DbMigration
    {
        public override void Up()
        {
            DropPrimaryKey("dbo.Ambiences");
            DropPrimaryKey("dbo.Amenities");
            DropPrimaryKey("dbo.Cuisines");
            DropPrimaryKey("dbo.PaymentMethods");
            DropPrimaryKey("dbo.Styles");
            AlterColumn("dbo.Ambiences", "Id", c => c.Int(nullable: false));
            AlterColumn("dbo.Amenities", "Id", c => c.Int(nullable: false));
            AlterColumn("dbo.Cuisines", "Id", c => c.Int(nullable: false));
            AlterColumn("dbo.PaymentMethods", "Id", c => c.Int(nullable: false));
            AlterColumn("dbo.Styles", "Id", c => c.Int(nullable: false));
            AddPrimaryKey("dbo.Ambiences", "Id");
            AddPrimaryKey("dbo.Amenities", "Id");
            AddPrimaryKey("dbo.Cuisines", "Id");
            AddPrimaryKey("dbo.PaymentMethods", "Id");
            AddPrimaryKey("dbo.Styles", "Id");
            DropColumn("dbo.Ambiences", "EnumId");
            DropColumn("dbo.Ambiences", "DateAdded");
            DropColumn("dbo.Ambiences", "DateModified");
            DropColumn("dbo.Amenities", "EnumId");
            DropColumn("dbo.Amenities", "DateAdded");
            DropColumn("dbo.Amenities", "DateModified");
            DropColumn("dbo.Cuisines", "EnumId");
            DropColumn("dbo.Cuisines", "DateAdded");
            DropColumn("dbo.Cuisines", "DateModified");
            DropColumn("dbo.PaymentMethods", "EnumId");
            DropColumn("dbo.PaymentMethods", "DateAdded");
            DropColumn("dbo.PaymentMethods", "DateModified");
            DropColumn("dbo.Styles", "EnumId");
            DropColumn("dbo.Styles", "DateAdded");
            DropColumn("dbo.Styles", "DateModified");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Styles", "DateModified", c => c.DateTime(nullable: false));
            AddColumn("dbo.Styles", "DateAdded", c => c.DateTime(nullable: false));
            AddColumn("dbo.Styles", "EnumId", c => c.Int(nullable: false));
            AddColumn("dbo.PaymentMethods", "DateModified", c => c.DateTime(nullable: false));
            AddColumn("dbo.PaymentMethods", "DateAdded", c => c.DateTime(nullable: false));
            AddColumn("dbo.PaymentMethods", "EnumId", c => c.Int(nullable: false));
            AddColumn("dbo.Cuisines", "DateModified", c => c.DateTime(nullable: false));
            AddColumn("dbo.Cuisines", "DateAdded", c => c.DateTime(nullable: false));
            AddColumn("dbo.Cuisines", "EnumId", c => c.Int(nullable: false));
            AddColumn("dbo.Amenities", "DateModified", c => c.DateTime(nullable: false));
            AddColumn("dbo.Amenities", "DateAdded", c => c.DateTime(nullable: false));
            AddColumn("dbo.Amenities", "EnumId", c => c.Int(nullable: false));
            AddColumn("dbo.Ambiences", "DateModified", c => c.DateTime(nullable: false));
            AddColumn("dbo.Ambiences", "DateAdded", c => c.DateTime(nullable: false));
            AddColumn("dbo.Ambiences", "EnumId", c => c.Int(nullable: false));
            DropPrimaryKey("dbo.Styles");
            DropPrimaryKey("dbo.PaymentMethods");
            DropPrimaryKey("dbo.Cuisines");
            DropPrimaryKey("dbo.Amenities");
            DropPrimaryKey("dbo.Ambiences");
            AlterColumn("dbo.Styles", "Id", c => c.Int(nullable: false, identity: true));
            AlterColumn("dbo.PaymentMethods", "Id", c => c.Int(nullable: false, identity: true));
            AlterColumn("dbo.Cuisines", "Id", c => c.Int(nullable: false, identity: true));
            AlterColumn("dbo.Amenities", "Id", c => c.Int(nullable: false, identity: true));
            AlterColumn("dbo.Ambiences", "Id", c => c.Int(nullable: false, identity: true));
            AddPrimaryKey("dbo.Styles", "Id");
            AddPrimaryKey("dbo.PaymentMethods", "Id");
            AddPrimaryKey("dbo.Cuisines", "Id");
            AddPrimaryKey("dbo.Amenities", "Id");
            AddPrimaryKey("dbo.Ambiences", "Id");
        }
    }
}
