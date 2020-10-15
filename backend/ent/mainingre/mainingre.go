// Code generated by entc, DO NOT EDIT.

package mainingre

const (
	// Label holds the string label denoting the mainingre type in the database.
	Label = "mainingre"
	// FieldID holds the string denoting the id field in the database.
	FieldID = "id"
	// FieldMAININGREDIENTNAME holds the string denoting the main_ingredient_name field in the database.
	FieldMAININGREDIENTNAME = "main_ingredient_name"

	// EdgeMAININGRERECORD holds the string denoting the mainingrerecord edge name in mutations.
	EdgeMAININGRERECORD = "MAININGRERECORD"

	// Table holds the table name of the mainingre in the database.
	Table = "mainingres"
	// MAININGRERECORDTable is the table the holds the MAININGRERECORD relation/edge.
	MAININGRERECORDTable = "recordfoods"
	// MAININGRERECORDInverseTable is the table name for the Recordfood entity.
	// It exists in this package in order to avoid circular dependency with the "recordfood" package.
	MAININGRERECORDInverseTable = "recordfoods"
	// MAININGRERECORDColumn is the table column denoting the MAININGRERECORD relation/edge.
	MAININGRERECORDColumn = "mainingre_mainingrerecord"
)

// Columns holds all SQL columns for mainingre fields.
var Columns = []string{
	FieldID,
	FieldMAININGREDIENTNAME,
}

// ValidColumn reports if the column name is valid (part of the table columns).
func ValidColumn(column string) bool {
	for i := range Columns {
		if column == Columns[i] {
			return true
		}
	}
	return false
}