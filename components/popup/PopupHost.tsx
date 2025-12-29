import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '@/constants/colors';
import { usePopup } from './PopupContext';

function pickVariantStyle(variant: 'success' | 'error' | 'info' | 'warning') {
  switch (variant) {
    case 'success':
      return { bg: Colors.success, iconName: 'checkmark-circle' };
    case 'error':
      return { bg: Colors.error, iconName: 'close-circle' };
    case 'warning':
      return { bg: Colors.warning, iconName: 'warning' };
    case 'info':
    default:
      return { bg: Colors.info, iconName: 'information-circle' };
  }
}

export function PopupHost() {
  const { popup, hidePopup } = usePopup();
  const { bg, iconName } = pickVariantStyle(popup.variant);

  const closeLabel = popup.closeLabel || 'OK';

  return (
    <Modal
      visible={popup.visible}
      transparent
      animationType="fade"
      onRequestClose={hidePopup}
    >
      <Pressable style={styles.backdrop} onPress={hidePopup}>
        <Pressable style={styles.card} onPress={() => {}}>
          <View style={[styles.iconWrap, { backgroundColor: bg + '22' }]}> 
            <Ionicons name={iconName as any} size={22} color={bg} />
          </View>

          <View style={styles.content}>
            {!!popup.title && <Text style={styles.title}>{popup.title}</Text>}
            <Text style={styles.message}>{popup.message}</Text>

            <View style={styles.actionsRow}>
              {popup.actions?.secondary && (
                <TouchableOpacity
                  style={[styles.actionButton, styles.secondaryButton]}
                  onPress={() => {
                    hidePopup();
                    popup.actions?.secondary?.onPress();
                  }}
                >
                  <Text style={styles.secondaryText}>{popup.actions.secondary.label}</Text>
                </TouchableOpacity>
              )}

              {popup.actions?.primary && (
                <TouchableOpacity
                  style={[styles.closeButton, { backgroundColor: bg }]}
                  onPress={() => {
                    hidePopup();
                    popup.actions?.primary?.onPress();
                  }}
                >
                  <Text style={styles.closeText}>{popup.actions.primary.label}</Text>
                </TouchableOpacity>
              )}

              {!popup.actions?.primary && popup.action && (
                <TouchableOpacity
                  style={[styles.actionButton, { borderColor: bg }]}
                  onPress={() => {
                    hidePopup();
                    popup.action?.onPress();
                  }}
                >
                  <Text style={[styles.actionText, { color: bg }]}>{popup.action.label}</Text>
                </TouchableOpacity>
              )}

              {!popup.actions?.primary && (
                <TouchableOpacity style={[styles.closeButton, { backgroundColor: bg }]} onPress={hidePopup}>
                  <Text style={styles.closeText}>{closeLabel}</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 420,
    borderRadius: 18,
    backgroundColor: Colors.white,
    padding: 16,
    flexDirection: 'row',
    gap: 12,
    elevation: 10,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 14,
  },
  iconWrap: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 4,
  },
  message: {
    fontSize: 14,
    color: Colors.textLight,
    lineHeight: 20,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 14,
  },
  actionButton: {
    paddingHorizontal: 14,
    height: 38,
    borderRadius: 12,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  secondaryButton: {
    borderColor: Colors.border,
  },
  secondaryText: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.text,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '700',
  },
  closeButton: {
    paddingHorizontal: 16,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.white,
  },
});
