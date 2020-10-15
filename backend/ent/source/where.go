// Code generated by entc, DO NOT EDIT.

package source

import (
	"github.com/facebook/ent/dialect/sql"
	"github.com/facebook/ent/dialect/sql/sqlgraph"
	"github.com/faomg201/app/ent/predicate"
)

// ID filters vertices based on their identifier.
func ID(id int) predicate.Source {
	return predicate.Source(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldID), id))
	})
}

// IDEQ applies the EQ predicate on the ID field.
func IDEQ(id int) predicate.Source {
	return predicate.Source(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldID), id))
	})
}

// IDNEQ applies the NEQ predicate on the ID field.
func IDNEQ(id int) predicate.Source {
	return predicate.Source(func(s *sql.Selector) {
		s.Where(sql.NEQ(s.C(FieldID), id))
	})
}

// IDIn applies the In predicate on the ID field.
func IDIn(ids ...int) predicate.Source {
	return predicate.Source(func(s *sql.Selector) {
		// if not arguments were provided, append the FALSE constants,
		// since we can't apply "IN ()". This will make this predicate falsy.
		if len(ids) == 0 {
			s.Where(sql.False())
			return
		}
		v := make([]interface{}, len(ids))
		for i := range v {
			v[i] = ids[i]
		}
		s.Where(sql.In(s.C(FieldID), v...))
	})
}

// IDNotIn applies the NotIn predicate on the ID field.
func IDNotIn(ids ...int) predicate.Source {
	return predicate.Source(func(s *sql.Selector) {
		// if not arguments were provided, append the FALSE constants,
		// since we can't apply "IN ()". This will make this predicate falsy.
		if len(ids) == 0 {
			s.Where(sql.False())
			return
		}
		v := make([]interface{}, len(ids))
		for i := range v {
			v[i] = ids[i]
		}
		s.Where(sql.NotIn(s.C(FieldID), v...))
	})
}

// IDGT applies the GT predicate on the ID field.
func IDGT(id int) predicate.Source {
	return predicate.Source(func(s *sql.Selector) {
		s.Where(sql.GT(s.C(FieldID), id))
	})
}

// IDGTE applies the GTE predicate on the ID field.
func IDGTE(id int) predicate.Source {
	return predicate.Source(func(s *sql.Selector) {
		s.Where(sql.GTE(s.C(FieldID), id))
	})
}

// IDLT applies the LT predicate on the ID field.
func IDLT(id int) predicate.Source {
	return predicate.Source(func(s *sql.Selector) {
		s.Where(sql.LT(s.C(FieldID), id))
	})
}

// IDLTE applies the LTE predicate on the ID field.
func IDLTE(id int) predicate.Source {
	return predicate.Source(func(s *sql.Selector) {
		s.Where(sql.LTE(s.C(FieldID), id))
	})
}

// SOURCENAME applies equality check predicate on the "SOURCE_NAME" field. It's identical to SOURCENAMEEQ.
func SOURCENAME(v string) predicate.Source {
	return predicate.Source(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldSOURCENAME), v))
	})
}

// SOURCEADDRESS applies equality check predicate on the "SOURCE_ADDRESS" field. It's identical to SOURCEADDRESSEQ.
func SOURCEADDRESS(v string) predicate.Source {
	return predicate.Source(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldSOURCEADDRESS), v))
	})
}

// SOURCETLE applies equality check predicate on the "SOURCE_TLE" field. It's identical to SOURCETLEEQ.
func SOURCETLE(v string) predicate.Source {
	return predicate.Source(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldSOURCETLE), v))
	})
}

// SOURCENAMEEQ applies the EQ predicate on the "SOURCE_NAME" field.
func SOURCENAMEEQ(v string) predicate.Source {
	return predicate.Source(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldSOURCENAME), v))
	})
}

// SOURCENAMENEQ applies the NEQ predicate on the "SOURCE_NAME" field.
func SOURCENAMENEQ(v string) predicate.Source {
	return predicate.Source(func(s *sql.Selector) {
		s.Where(sql.NEQ(s.C(FieldSOURCENAME), v))
	})
}

// SOURCENAMEIn applies the In predicate on the "SOURCE_NAME" field.
func SOURCENAMEIn(vs ...string) predicate.Source {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.Source(func(s *sql.Selector) {
		// if not arguments were provided, append the FALSE constants,
		// since we can't apply "IN ()". This will make this predicate falsy.
		if len(v) == 0 {
			s.Where(sql.False())
			return
		}
		s.Where(sql.In(s.C(FieldSOURCENAME), v...))
	})
}

// SOURCENAMENotIn applies the NotIn predicate on the "SOURCE_NAME" field.
func SOURCENAMENotIn(vs ...string) predicate.Source {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.Source(func(s *sql.Selector) {
		// if not arguments were provided, append the FALSE constants,
		// since we can't apply "IN ()". This will make this predicate falsy.
		if len(v) == 0 {
			s.Where(sql.False())
			return
		}
		s.Where(sql.NotIn(s.C(FieldSOURCENAME), v...))
	})
}

// SOURCENAMEGT applies the GT predicate on the "SOURCE_NAME" field.
func SOURCENAMEGT(v string) predicate.Source {
	return predicate.Source(func(s *sql.Selector) {
		s.Where(sql.GT(s.C(FieldSOURCENAME), v))
	})
}

// SOURCENAMEGTE applies the GTE predicate on the "SOURCE_NAME" field.
func SOURCENAMEGTE(v string) predicate.Source {
	return predicate.Source(func(s *sql.Selector) {
		s.Where(sql.GTE(s.C(FieldSOURCENAME), v))
	})
}

// SOURCENAMELT applies the LT predicate on the "SOURCE_NAME" field.
func SOURCENAMELT(v string) predicate.Source {
	return predicate.Source(func(s *sql.Selector) {
		s.Where(sql.LT(s.C(FieldSOURCENAME), v))
	})
}

// SOURCENAMELTE applies the LTE predicate on the "SOURCE_NAME" field.
func SOURCENAMELTE(v string) predicate.Source {
	return predicate.Source(func(s *sql.Selector) {
		s.Where(sql.LTE(s.C(FieldSOURCENAME), v))
	})
}

// SOURCENAMEContains applies the Contains predicate on the "SOURCE_NAME" field.
func SOURCENAMEContains(v string) predicate.Source {
	return predicate.Source(func(s *sql.Selector) {
		s.Where(sql.Contains(s.C(FieldSOURCENAME), v))
	})
}

// SOURCENAMEHasPrefix applies the HasPrefix predicate on the "SOURCE_NAME" field.
func SOURCENAMEHasPrefix(v string) predicate.Source {
	return predicate.Source(func(s *sql.Selector) {
		s.Where(sql.HasPrefix(s.C(FieldSOURCENAME), v))
	})
}

// SOURCENAMEHasSuffix applies the HasSuffix predicate on the "SOURCE_NAME" field.
func SOURCENAMEHasSuffix(v string) predicate.Source {
	return predicate.Source(func(s *sql.Selector) {
		s.Where(sql.HasSuffix(s.C(FieldSOURCENAME), v))
	})
}

// SOURCENAMEEqualFold applies the EqualFold predicate on the "SOURCE_NAME" field.
func SOURCENAMEEqualFold(v string) predicate.Source {
	return predicate.Source(func(s *sql.Selector) {
		s.Where(sql.EqualFold(s.C(FieldSOURCENAME), v))
	})
}

// SOURCENAMEContainsFold applies the ContainsFold predicate on the "SOURCE_NAME" field.
func SOURCENAMEContainsFold(v string) predicate.Source {
	return predicate.Source(func(s *sql.Selector) {
		s.Where(sql.ContainsFold(s.C(FieldSOURCENAME), v))
	})
}

// SOURCEADDRESSEQ applies the EQ predicate on the "SOURCE_ADDRESS" field.
func SOURCEADDRESSEQ(v string) predicate.Source {
	return predicate.Source(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldSOURCEADDRESS), v))
	})
}

// SOURCEADDRESSNEQ applies the NEQ predicate on the "SOURCE_ADDRESS" field.
func SOURCEADDRESSNEQ(v string) predicate.Source {
	return predicate.Source(func(s *sql.Selector) {
		s.Where(sql.NEQ(s.C(FieldSOURCEADDRESS), v))
	})
}

// SOURCEADDRESSIn applies the In predicate on the "SOURCE_ADDRESS" field.
func SOURCEADDRESSIn(vs ...string) predicate.Source {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.Source(func(s *sql.Selector) {
		// if not arguments were provided, append the FALSE constants,
		// since we can't apply "IN ()". This will make this predicate falsy.
		if len(v) == 0 {
			s.Where(sql.False())
			return
		}
		s.Where(sql.In(s.C(FieldSOURCEADDRESS), v...))
	})
}

// SOURCEADDRESSNotIn applies the NotIn predicate on the "SOURCE_ADDRESS" field.
func SOURCEADDRESSNotIn(vs ...string) predicate.Source {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.Source(func(s *sql.Selector) {
		// if not arguments were provided, append the FALSE constants,
		// since we can't apply "IN ()". This will make this predicate falsy.
		if len(v) == 0 {
			s.Where(sql.False())
			return
		}
		s.Where(sql.NotIn(s.C(FieldSOURCEADDRESS), v...))
	})
}

// SOURCEADDRESSGT applies the GT predicate on the "SOURCE_ADDRESS" field.
func SOURCEADDRESSGT(v string) predicate.Source {
	return predicate.Source(func(s *sql.Selector) {
		s.Where(sql.GT(s.C(FieldSOURCEADDRESS), v))
	})
}

// SOURCEADDRESSGTE applies the GTE predicate on the "SOURCE_ADDRESS" field.
func SOURCEADDRESSGTE(v string) predicate.Source {
	return predicate.Source(func(s *sql.Selector) {
		s.Where(sql.GTE(s.C(FieldSOURCEADDRESS), v))
	})
}

// SOURCEADDRESSLT applies the LT predicate on the "SOURCE_ADDRESS" field.
func SOURCEADDRESSLT(v string) predicate.Source {
	return predicate.Source(func(s *sql.Selector) {
		s.Where(sql.LT(s.C(FieldSOURCEADDRESS), v))
	})
}

// SOURCEADDRESSLTE applies the LTE predicate on the "SOURCE_ADDRESS" field.
func SOURCEADDRESSLTE(v string) predicate.Source {
	return predicate.Source(func(s *sql.Selector) {
		s.Where(sql.LTE(s.C(FieldSOURCEADDRESS), v))
	})
}

// SOURCEADDRESSContains applies the Contains predicate on the "SOURCE_ADDRESS" field.
func SOURCEADDRESSContains(v string) predicate.Source {
	return predicate.Source(func(s *sql.Selector) {
		s.Where(sql.Contains(s.C(FieldSOURCEADDRESS), v))
	})
}

// SOURCEADDRESSHasPrefix applies the HasPrefix predicate on the "SOURCE_ADDRESS" field.
func SOURCEADDRESSHasPrefix(v string) predicate.Source {
	return predicate.Source(func(s *sql.Selector) {
		s.Where(sql.HasPrefix(s.C(FieldSOURCEADDRESS), v))
	})
}

// SOURCEADDRESSHasSuffix applies the HasSuffix predicate on the "SOURCE_ADDRESS" field.
func SOURCEADDRESSHasSuffix(v string) predicate.Source {
	return predicate.Source(func(s *sql.Selector) {
		s.Where(sql.HasSuffix(s.C(FieldSOURCEADDRESS), v))
	})
}

// SOURCEADDRESSEqualFold applies the EqualFold predicate on the "SOURCE_ADDRESS" field.
func SOURCEADDRESSEqualFold(v string) predicate.Source {
	return predicate.Source(func(s *sql.Selector) {
		s.Where(sql.EqualFold(s.C(FieldSOURCEADDRESS), v))
	})
}

// SOURCEADDRESSContainsFold applies the ContainsFold predicate on the "SOURCE_ADDRESS" field.
func SOURCEADDRESSContainsFold(v string) predicate.Source {
	return predicate.Source(func(s *sql.Selector) {
		s.Where(sql.ContainsFold(s.C(FieldSOURCEADDRESS), v))
	})
}

// SOURCETLEEQ applies the EQ predicate on the "SOURCE_TLE" field.
func SOURCETLEEQ(v string) predicate.Source {
	return predicate.Source(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldSOURCETLE), v))
	})
}

// SOURCETLENEQ applies the NEQ predicate on the "SOURCE_TLE" field.
func SOURCETLENEQ(v string) predicate.Source {
	return predicate.Source(func(s *sql.Selector) {
		s.Where(sql.NEQ(s.C(FieldSOURCETLE), v))
	})
}

// SOURCETLEIn applies the In predicate on the "SOURCE_TLE" field.
func SOURCETLEIn(vs ...string) predicate.Source {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.Source(func(s *sql.Selector) {
		// if not arguments were provided, append the FALSE constants,
		// since we can't apply "IN ()". This will make this predicate falsy.
		if len(v) == 0 {
			s.Where(sql.False())
			return
		}
		s.Where(sql.In(s.C(FieldSOURCETLE), v...))
	})
}

// SOURCETLENotIn applies the NotIn predicate on the "SOURCE_TLE" field.
func SOURCETLENotIn(vs ...string) predicate.Source {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.Source(func(s *sql.Selector) {
		// if not arguments were provided, append the FALSE constants,
		// since we can't apply "IN ()". This will make this predicate falsy.
		if len(v) == 0 {
			s.Where(sql.False())
			return
		}
		s.Where(sql.NotIn(s.C(FieldSOURCETLE), v...))
	})
}

// SOURCETLEGT applies the GT predicate on the "SOURCE_TLE" field.
func SOURCETLEGT(v string) predicate.Source {
	return predicate.Source(func(s *sql.Selector) {
		s.Where(sql.GT(s.C(FieldSOURCETLE), v))
	})
}

// SOURCETLEGTE applies the GTE predicate on the "SOURCE_TLE" field.
func SOURCETLEGTE(v string) predicate.Source {
	return predicate.Source(func(s *sql.Selector) {
		s.Where(sql.GTE(s.C(FieldSOURCETLE), v))
	})
}

// SOURCETLELT applies the LT predicate on the "SOURCE_TLE" field.
func SOURCETLELT(v string) predicate.Source {
	return predicate.Source(func(s *sql.Selector) {
		s.Where(sql.LT(s.C(FieldSOURCETLE), v))
	})
}

// SOURCETLELTE applies the LTE predicate on the "SOURCE_TLE" field.
func SOURCETLELTE(v string) predicate.Source {
	return predicate.Source(func(s *sql.Selector) {
		s.Where(sql.LTE(s.C(FieldSOURCETLE), v))
	})
}

// SOURCETLEContains applies the Contains predicate on the "SOURCE_TLE" field.
func SOURCETLEContains(v string) predicate.Source {
	return predicate.Source(func(s *sql.Selector) {
		s.Where(sql.Contains(s.C(FieldSOURCETLE), v))
	})
}

// SOURCETLEHasPrefix applies the HasPrefix predicate on the "SOURCE_TLE" field.
func SOURCETLEHasPrefix(v string) predicate.Source {
	return predicate.Source(func(s *sql.Selector) {
		s.Where(sql.HasPrefix(s.C(FieldSOURCETLE), v))
	})
}

// SOURCETLEHasSuffix applies the HasSuffix predicate on the "SOURCE_TLE" field.
func SOURCETLEHasSuffix(v string) predicate.Source {
	return predicate.Source(func(s *sql.Selector) {
		s.Where(sql.HasSuffix(s.C(FieldSOURCETLE), v))
	})
}

// SOURCETLEEqualFold applies the EqualFold predicate on the "SOURCE_TLE" field.
func SOURCETLEEqualFold(v string) predicate.Source {
	return predicate.Source(func(s *sql.Selector) {
		s.Where(sql.EqualFold(s.C(FieldSOURCETLE), v))
	})
}

// SOURCETLEContainsFold applies the ContainsFold predicate on the "SOURCE_TLE" field.
func SOURCETLEContainsFold(v string) predicate.Source {
	return predicate.Source(func(s *sql.Selector) {
		s.Where(sql.ContainsFold(s.C(FieldSOURCETLE), v))
	})
}

// HasSOURCERECORD applies the HasEdge predicate on the "SOURCERECORD" edge.
func HasSOURCERECORD() predicate.Source {
	return predicate.Source(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.To(SOURCERECORDTable, FieldID),
			sqlgraph.Edge(sqlgraph.O2M, false, SOURCERECORDTable, SOURCERECORDColumn),
		)
		sqlgraph.HasNeighbors(s, step)
	})
}

// HasSOURCERECORDWith applies the HasEdge predicate on the "SOURCERECORD" edge with a given conditions (other predicates).
func HasSOURCERECORDWith(preds ...predicate.Recordfood) predicate.Source {
	return predicate.Source(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.To(SOURCERECORDInverseTable, FieldID),
			sqlgraph.Edge(sqlgraph.O2M, false, SOURCERECORDTable, SOURCERECORDColumn),
		)
		sqlgraph.HasNeighborsWith(s, step, func(s *sql.Selector) {
			for _, p := range preds {
				p(s)
			}
		})
	})
}

// And groups list of predicates with the AND operator between them.
func And(predicates ...predicate.Source) predicate.Source {
	return predicate.Source(func(s *sql.Selector) {
		s1 := s.Clone().SetP(nil)
		for _, p := range predicates {
			p(s1)
		}
		s.Where(s1.P())
	})
}

// Or groups list of predicates with the OR operator between them.
func Or(predicates ...predicate.Source) predicate.Source {
	return predicate.Source(func(s *sql.Selector) {
		s1 := s.Clone().SetP(nil)
		for i, p := range predicates {
			if i > 0 {
				s1.Or()
			}
			p(s1)
		}
		s.Where(s1.P())
	})
}

// Not applies the not operator on the given predicate.
func Not(p predicate.Source) predicate.Source {
	return predicate.Source(func(s *sql.Selector) {
		p(s.Not())
	})
}