import React, { useMemo, useCallback, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import CustomInput from 'components/CustomInput';
import { formatTeamMembersUpdate } from 'formatters/settings';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

import './TeamForm.styles.less';

const TeamForm = ({ data, updateTeam }) => {
  const { t } = useTranslation();
  const inputRef = useRef();
  const [tempUsers, setTempUsers] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => setTempUsers(data), [data]);

  const handleAddClick = useCallback(() => setIsEditMode(prevState => !prevState), []);

  const handleSubmitEmailClick = () => {
    const newMember = { email: inputRef.current.value, firstName: '', lastName: '' };
    // TODO discuss with be - split Update and Delete
    updateTeam(formatTeamMembersUpdate([...tempUsers, newMember]));
    setTempUsers(prevState => [...prevState, newMember]);
    setIsEditMode(prevState => !prevState);
  };

  const handleDeleteClick = emailToRemove => {
    const newMembers = tempUsers.filter(member => member.email !== emailToRemove);
    // TODO discuss with be - split Update and Delete
    updateTeam(formatTeamMembersUpdate(newMembers));
    setTempUsers(newMembers);
  };

  const teamBlock = useMemo(() => {
    if (!tempUsers.length) return null;
    return tempUsers.map(user => (
      <div key={user.email} className="team-form__team-item">
        <div className="team-form__team-item-text">
          <h5>{`${user.firstName} ${user.lastName}`}</h5>
          <h4>{user.email}</h4>
        </div>
        <div className="team-form__team-item-icons">
          <button onClick={() => handleDeleteClick(user.email)} type="button" className="team-form__trash-btn">
            <img src="/svg/trash-alt.svg" alt="trash-can-svg" />
          </button>
        </div>
      </div>
    ));
  }, [tempUsers]);

  return (
    <div className="team-form__team-content">
      {teamBlock}
      <div className={classNames('team-form__team-item', 'team-form__plus-item')}>
        {!isEditMode && (
          <div onClick={handleAddClick} className="team-form__add-user">
            <p>{t('settings:team.add')}</p>
            <img src="/svg/plus.svg" alt="plus-svg" />
          </div>
        )}
        {isEditMode && (
          <div className="team-form__submit-user">
            <CustomInput ref={inputRef} className="login-form__phone" label={t('settings:team.new')} />
            <button className="team-form__submit-button" type="button" onClick={handleSubmitEmailClick}>
              <img className="team-form__submit-icon" src="/svg/success.svg" alt="success-svg" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

TeamForm.propTypes = {
  data: PropTypes.array,
  updateTeam: PropTypes.func.isRequired,
};

TeamForm.defaultProps = {
  data: [],
};

export default TeamForm;
